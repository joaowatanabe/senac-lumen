"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBlocks = listBlocks;
exports.createBlock = createBlock;
exports.deleteBlock = deleteBlock;
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * GET /api/planner
 * Retorna todos os blocos do planner do usuário autenticado.
 */
async function listBlocks(req, res) {
    try {
        const userId = req.userId;
        const blocks = await prisma_1.default.plannerBlock.findMany({
            where: { userId },
            include: { subject: true },
            orderBy: [{ dayOfWeek: "asc" }, { durationMinutes: "desc" }],
        });
        res.json(blocks);
    }
    catch (error) {
        console.error("Erro ao listar blocos do planner:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}
/**
 * POST /api/planner
 * Cria um bloco no planner.
 * Body: { subjectId, dayOfWeek, durationMinutes }
 */
async function createBlock(req, res) {
    try {
        const { subjectId, dayOfWeek, durationMinutes } = req.body;
        // Valida campos obrigatórios
        if (subjectId === undefined || dayOfWeek === undefined || durationMinutes === undefined) {
            res.status(400).json({ message: "Todos os campos são obrigatórios: subjectId, dayOfWeek e durationMinutes." });
            return;
        }
        // Valida dia da semana (0-6)
        if (typeof dayOfWeek !== "number" || dayOfWeek < 0 || dayOfWeek > 6) {
            res.status(400).json({ message: "O dia da semana deve ser um número entre 0 (Domingo) e 6 (Sábado)." });
            return;
        }
        // Valida duração (15 a 480 minutos)
        if (typeof durationMinutes !== "number" || durationMinutes < 15 || durationMinutes > 480) {
            res.status(400).json({ message: "A duração deve ser um número entre 15 e 480 minutos." });
            return;
        }
        // Verifica se a matéria pertence ao usuário
        const subject = await prisma_1.default.subject.findUnique({ where: { id: subjectId } });
        if (!subject || subject.userId !== req.userId) {
            res.status(404).json({ message: "Matéria não encontrada." });
            return;
        }
        const block = await prisma_1.default.plannerBlock.create({
            data: {
                userId: req.userId,
                subjectId,
                dayOfWeek,
                durationMinutes,
            },
            include: { subject: true },
        });
        res.status(201).json(block);
    }
    catch (error) {
        console.error("Erro ao criar bloco no planner:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}
/**
 * DELETE /api/planner/:id
 * Remove um bloco do planner.
 */
async function deleteBlock(req, res) {
    try {
        const { id } = req.params;
        // Verifica ownership do bloco
        const existing = await prisma_1.default.plannerBlock.findUnique({ where: { id } });
        if (!existing || existing.userId !== req.userId) {
            res.status(404).json({ message: "Bloco do planner não encontrado." });
            return;
        }
        await prisma_1.default.plannerBlock.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        console.error("Erro ao deletar bloco do planner:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}
//# sourceMappingURL=plannerController.js.map