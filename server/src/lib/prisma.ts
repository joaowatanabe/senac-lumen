import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma v7 requer um driver adapter para conexão direta
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Instância única do PrismaClient para todo o servidor
const prisma = new PrismaClient({ adapter });

export default prisma;
