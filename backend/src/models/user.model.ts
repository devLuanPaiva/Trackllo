import { Prisma } from '@prisma/client'

export type User = Prisma.UserGetPayload<{
    include: {
        boards: true,
        tasks: true
    }
}>

export type CreateUserInput = Prisma.UserCreateInput
export type UpdateUserInput = Prisma.UserUpdateInput