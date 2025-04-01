import { Prisma } from '@prisma/client'
export type Board = Prisma.BoardGetPayload<{
    include: {
        user: true
        columns: true
    }
}>
export type CreateBoardInput = Prisma.BoardCreateInput
export type UpdateBoardInput = Prisma.BoardUpdateInput