import jwt from "jsonwebtoken";
import pool from "../db/db.js";
import companyPool from "../db/companyDb.js";

export interface ClientRow {
    fclientid: string;
    fclientname: string;
    fclientstatus: string;
}

export interface ClientCsResult {
    fclientid: string;
    fcsaccountid: string;
    pwd_ok: boolean;
}

export interface ClientTokenPayload {
    clientId: string;
    clientName: string;
    customerId: string;
}

const getSecret = (): string => {
    const secret = process.env.CLIENT_JWT_SECRET;
    if (!secret) throw new Error("CLIENT_JWT_SECRET is not configured");
    return secret;
};

// Current DB: tblclientlogin
export const findClient = async (clientId: string): Promise<ClientRow | null> => {
    const result = await pool.query(`SELECT * FROM dbo.sp_clientlogin($1)`, [
        clientId,
    ]);
    return result.rows[0] ?? null;
};

// Company DB: tblcompany -> tblaccountcs
export const checkCustomerLogin = async (
    clientId: string,
    password: string,
): Promise<ClientCsResult | null> => {
    const result = await companyPool.query(
        `SELECT * FROM dbo.sp_clientcslogin($1, $2)`,
        [clientId, password],
    );
    return result.rows[0] ?? null;
};

export const signClientToken = (payload: ClientTokenPayload): string =>
    jwt.sign(payload, getSecret(), { expiresIn: "24h" });

export const verifyClientToken = (token: string): ClientTokenPayload =>
    jwt.verify(token, getSecret()) as ClientTokenPayload;