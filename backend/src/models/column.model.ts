import { Prisma } from '@prisma/client'

export type User = Prisma.ColumnGetPayload<{
    include: {
        board: true,
        tasks: true
    }
}>

export type CreateColumnInput = Prisma.ColumnCreateInput
export type UpdateColumnInput = Prisma.ColumnUpdateInput