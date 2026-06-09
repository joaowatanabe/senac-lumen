"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_ts_1 = require("../generated/prisma/client.ts");
const adapter_pg_1 = require("@prisma/adapter-pg");
// Prisma v7 requer um driver adapter para conexão direta
const adapter = new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL });
// Instância única do PrismaClient para todo o servidor
const prisma = new client_ts_1.PrismaClient({ adapter });
exports.default = prisma;
//# sourceMappingURL=prisma.js.map