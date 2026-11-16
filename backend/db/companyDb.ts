import pg from "pg";

const { Pool } = pg;

const companyPool = new Pool({
    host: process.env.COMPANY_DB_HOST,
    port: Number(process.env.COMPANY_DB_PORT),
    database: process.env.COMPANY_DB_NAME,
    user: process.env.COMPANY_DB_USER,
    password: process.env.COMPANY_DB_PASSWORD,
});

export default companyPool;