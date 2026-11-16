import { Request, Response } from "express";
import {
    findClient,
    signClientToken,
    checkCustomerLogin,
} from "../services/AuthService.js";
import { ClientAuthenticatedRequest } from "../middleware/AuthMiddleware.js";

export const clientLogin = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { clientId, password } = req.body;

        if (!clientId || !String(clientId).trim()) {
            return res.status(400).json({
                success: false,
                message: "Please input Client ID",
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Please input Password",
            });
        }

        const client = await findClient(String(clientId));

        if (!client) {
            return res.status(401).json({
                success: false,
                message: "Client does not exist",
            });
        }

        if (client.fclientstatus !== "A") {
            return res.status(403).json({
                success: false,
                message: `Client '${client.fclientid}' is inactive`,
            });
        }

        const cs = await checkCustomerLogin(client.fclientid, String(password));

        if (!cs) {
            return res.status(401).json({
                success: false,
                message: "Client is not linked to any company",
            });
        }

        if (!cs.pwd_ok) {
            return res.status(401).json({
                success: false,
                message: "Please input the Password correctly",
            });
        }

        const token = signClientToken({
            clientId: client.fclientid,
            clientName: client.fclientname,
            customerId: cs.fcsaccountid,
        });

        res.cookie("clientToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Client login successful",
            data: {
                clientId: client.fclientid,
                clientName: client.fclientname,
                customerId: cs.fcsaccountid,
            },
        });
    } catch (error: unknown) {
        console.error("Client login controller error:", error);
        return res.status(500).json({ success: false, message: "Client login failed" });
    }
};

export const getClientMe = (
    req: ClientAuthenticatedRequest,
    res: Response,
): Response => {
    if (!req.client) {
        return res.status(401).json({
            success: false,
            message: "Client authentication required",
        });
    }

    return res.status(200).json({ success: true, data: req.client });
};

export const clientLogout = (_req: Request, res: Response): Response => {
    res.clearCookie("clientToken");
    return res.status(200).json({ success: true, message: "Client logged out" });
};