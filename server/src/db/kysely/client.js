"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// packages/db/kysely.ts or db/client.ts
const kysely_1 = require("kysely");
const pg_1 = require("pg");
const db = new kysely_1.Kysely({
    dialect: new kysely_1.PostgresDialect({
        pool: new pg_1.Pool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        }),
    }),
});
exports.default = db;
