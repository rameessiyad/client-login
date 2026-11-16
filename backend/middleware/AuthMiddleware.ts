import { Request, Response, NextFunction } from "express";
import { findClient, verifyClientToken } from "../services/AuthService.js";

export interface ClientAuthenticatedRequest extends Request {
    client?: { clientId: string; clientName: string; customerId: string };
}

export const authenticateClient = async (
    req: ClientAuthenticatedRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const token = req.cookies?.clientToken;

        if (!token) {
            res.status(401).json({
                success: false,
                message: "Client authentication required",
            });
            return;
        }

        let payload;
        try {
            payload = verifyClientToken(token);
        } catch {
            res.status(401).json({
                success: false,
                message: "Client session expired or invalid",
            });
            return;
        }

        // re-check the client still exists and is active
        const client = await findClient(payload.clientId);

        if (!client) {
            res.status(401).json({ success: false, message: "Client does not exist" });
            return;
        }

        if (client.fclientstatus !== "A") {
            res.status(403).json({
                success: false,
                message: `Client '${client.fclientid}' is inactive`,
            });
            return;
        }

        req.client = {
            clientId: client.fclientid,
            clientName: client.fclientname,
            customerId: payload.customerId,
        };

        next();
    } catch (error) {
        console.error("Client authentication error:", error);
        res.status(500).json({ success: false, message: "Client authentication failed" });
    }
};