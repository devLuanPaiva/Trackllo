import { Prisma } from '@prisma/client'

export type Task = Prisma.TaskGetPayload<{
    include: {
        user: true,
        column: true
    }
}>;

export type CreateTaskInput = Prisma.TaskCreateInput;
export type UpdateTaskInput = Prisma.TaskUpdateInput;
