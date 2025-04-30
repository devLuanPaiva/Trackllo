import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaProvider } from '../database/prisma.provider';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaProvider) { }

    async getAllTasks(userId: string, columnId: string): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: { userId, columnId },
            include: { user: true, column: true },
        });
    }

    async getTaskById(id: string, userId: string): Promise<Task> {
        const task = await this.prisma.task.findUnique({
            where: { id, userId },
            include: { user: true, column: true },
        });

        if (!task) throw new NotFoundException('Tarefa não encontrada');
        return task;
    }

    async createTask(userId: string, title: string, description: string, columnId: string, image?: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('Usuário não encontrado');

        const column = await this.prisma.column.findUnique({ where: { id: columnId } });
        if (!column) throw new NotFoundException('Coluna não encontrada.');

        return this.prisma.task.create({
            data: {
                title,
                description,
                image,
                columnId,
                userId
            },
            include: { user: true, column: true },
        });
    }

    async updateTask(id: string, userId: string, title: string, description: string, columnId: string, image?: string) {
        const task = await this.prisma.task.findUnique({ where: { id, userId } });
        if (!task) throw new NotFoundException('Tarefa não encontrada ou não pertence ao usuário.');

        const column = await this.prisma.column.findUnique({ where: { id: columnId } });
        if (!column) throw new NotFoundException('Coluna não encontrada.');

        return this.prisma.task.update({
            where: { id },
            data: {
                title,
                description,
                image,
                columnId
            },
            include: { user: true, column: true },
        });
    }

    async deleteTask(id: string, userId: string) {
        const task = await this.prisma.task.findUnique({ where: { id, userId } });
        if (!task) throw new NotFoundException('Tarefa não encontrada ou não pertence ao usuário.');

        return this.prisma.task.delete({
            where: { id },
            include: { user: true, column: true },
        });
    }

    async moveTask(taskId: string, userId: string, newColumnId: string) {
        const task = await this.prisma.task.findUnique({ where: { id: taskId, userId } });
        if (!task) throw new NotFoundException('Tarefa não encontrada ou não pertence ao usuário.');

        const column = await this.prisma.column.findUnique({ where: { id: newColumnId } });
        if (!column) throw new NotFoundException('Coluna não encontrada.');

        return this.prisma.task.update({
            where: { id: taskId },
            data: { columnId: newColumnId },
            include: { user: true, column: true },
        });
    }
}