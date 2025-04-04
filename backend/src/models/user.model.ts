import { Prisma } from '@prisma/client'

export type User = Prisma.UserGetPayload<{
    include: {
        boards: true,
        tasks: true
    }
}>

export type CreateUserInput = Prisma.UserCreateInput & {
    password: string;
}

export type UpdateUserInput = Prisma.UserUpdateInput & {
    password?: string;
}
