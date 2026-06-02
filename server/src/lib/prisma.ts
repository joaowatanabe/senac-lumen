import { PrismaClient } from "./generated/prisma";

// Instância única do PrismaClient para todo o servidor
const prisma = new PrismaClient();

export default prisma;
