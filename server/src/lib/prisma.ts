import { PrismaClient } from "../generated/prisma/client";

// Instância única do PrismaClient para todo o servidor
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export default prisma;
