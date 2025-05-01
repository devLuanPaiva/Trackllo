import { Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { CreateUserDto, UpdateUserDto } from "./users.dto"
import { PrismaProvider } from "../database/prisma.provider"
import { Prisma } from "@prisma/client"

const SECRET = process.env.JWT_SECRET ?? "secrettoken"

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaProvider) {}

	async getAllUsers() {
		return this.prismaService.user.findMany({
			include: { boards: true, tasks: true },
		})
	}

	async getUserById(id: string) {
		return this.prismaService.user.findUnique({
			where: { id },
			include: { boards: true, tasks: true },
		})
	}

	async createUser(data: CreateUserDto) {
		const existingUser = await this.prismaService.user.findUnique({
			where: { email: data.email },
		})
		if (existingUser) throw new Error("Este e-mail já está em uso")

		const hashedPassword = await bcrypt.hash(data.password, 10)

		return this.prismaService.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
			} as Prisma.UserUncheckedCreateInput,
			select: { id: true, name: true, email: true },
		})
	}

	async loginUser(email: string, password: string) {
		const user = await this.prismaService.user.findUnique({
			where: { email },
			select: { id: true, name: true, email: true, password: true },
		})

		if (!user) {
			throw new Error("Usuário não encontrado")
		}
		if (!user?.password) throw new Error("Credenciais inválidas!")

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) throw new Error("Credenciais inválidas!")

		const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" })

		await this.prismaService.user.update({
			where: { id: user.id },
			data: { token } as Prisma.UserUncheckedUpdateInput,
		})

		return { user, token }
	}

	async updateUser(id: string, data: UpdateUserDto) {
		return this.prismaService.user.update({
			where: { id },
			data,
			include: { boards: true, tasks: true },
		})
	}

	async deleteUser(id: string) {
		const user = await this.prismaService.user.findUnique({ where: { id } })

		if (!user) throw new Error("Usuário não encontrado")

		return this.prismaService.user.delete({
			where: { id },
			include: { boards: true, tasks: true },
		})
	}
}
