import { Prisma } from '@prisma/client'

export type Column = Prisma.ColumnGetPayload<{
    include: {
        board: true,
        tasks: true
    }
}>

export type CreateColumnInput = Prisma.ColumnCreateInput
export type UpdateColumnInput = Prisma.ColumnUpdateInput