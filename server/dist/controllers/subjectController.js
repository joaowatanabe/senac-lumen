"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSubjects = listSubjects;
exports.createSubject = createSubject;
exports.updateSubject = updateSubject;
exports.deleteSubject = deleteSubject;
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * GET /api/subjects
 * Lista todas as matérias do usuário autenticado.
 */
async function listSubjects(req, res) {
    try {
        const subjects = await prisma_1.default.subject.findMany({
            where: { userId: req.userId },
            include: {
                activities: true,
            },
            orderBy: { createdAt: "asc" },
        });
        res.json(subjects);
    }
    catch (error) {
        console.error("Erro ao listar matérias:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}
/**
 * POST /api/subjects
 * Cria uma nova matéria para o usuário autenticado.
 */
async function createSubject(req, res) {
    try {
        const { name, color, category, icon } = req.body;
        if (!name || !color) {
            res.status(400).json({ message: "Nome e cor são obrigatórios." });
            return;
        }
        const validColors = ["indigo", "sky", "emerald", "amber", "rose", "violet", "orange", "teal"];
        if (!validColors.includes(color)) {
            res.status(400).json({ message: `Cor inválida. Use: ${validColors.join(", ")}` });
            return;
        }
        const subject = await prisma_1.default.subject.create({
            data: {
                name,
                color,
                category: category || null,
                icon: icon || null,
                userId: req.userId
            },
        });
        res.status(201).json(subject);
    }
    catch (error) {
        console.error("Erro ao criar matéria:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}
/**
 * PATCH /api/subjects/:id
 * Edita uma matéria do usuário autenticado.
 */
async function updateSubject(req, res) {
    try {
        const { id } = req.params;
        const { name, color, category, icon } = req.body;
        // Verifica ownership
        const existing = await prisma_1.default.subject.findUnique({ where: { id } });
        if (!existing || existing.userId !== req.userId) {
            res.status(404).json({ message: "Matéria não encontrada." });
            return;
        }
        if (color) {
            const validColors = ["indigo", "sky", "emerald", "amber", "rose", "violet", "orange", "teal"];
            if (!validColors.includes(color)) {
                res.status(400).json({ message: `Cor inválida. Use: ${validColors.join(", ")}` });
                return;
            }
        }
        const updated = await prisma_1.default.subject.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(color && { color }),
                category: category === undefined ? undefined : (category || null),
                icon: icon === undefined ? undefined : (icon || null),
            },
        });
        res.json(updated);
    }
    catch (error) {
        console.error("Erro ao editar matéria:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}
/**
 * DELETE /api/subjects/:id
 * Deleta uma matéria do usuário autenticado.
 */
async function deleteSubject(req, res) {
    try {
        const { id } = req.params;
        // Verifica ownership
        const existing = await prisma_1.default.subject.findUnique({ where: { id } });
        if (!existing || existing.userId !== req.userId) {
            res.status(404).json({ message: "Matéria não encontrada." });
            return;
        }
        // Deleta em cascata: registros dependentes primeiro, depois a matéria
        await prisma_1.default.$transaction([
            prisma_1.default.pomodoroSession.deleteMany({ where: { subjectId: id } }),
            prisma_1.default.activity.deleteMany({ where: { subjectId: id } }),
            prisma_1.default.plannerBlock.deleteMany({ where: { subjectId: id } }),
            prisma_1.default.subject.delete({ where: { id } }),
        ]);
        res.status(204).send();
    }
    catch (error) {
        console.error("Erro ao deletar matéria:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}
//# sourceMappingURL=subjectController.js.map