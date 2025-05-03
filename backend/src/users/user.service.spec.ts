import { mockUsers } from "../mocks"
import * as bcrypt from "bcrypt"
import { UsersService } from "./users.service"
import { PrismaProvider } from "../database/prisma.provider"

const mockPrismaService: PrismaProvider = {
	user: {
		findMany: jest.fn(),
		findUnique: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	},
} as unknown as PrismaProvider
describe("UsersService", () => {
	let service: UsersService

	beforeEach(() => {
		service = new UsersService(mockPrismaService)
		jest.clearAllMocks()
	})
	it("should return all users", async () => {
		;(mockPrismaService.user.findMany as jest.Mock).mockResolvedValue([
			mockUsers,
		])
		const users = await service.getAllUsers()
		expect(users).toEqual([mockUsers])
	})
	it("should return a user by ID", async () => {
		;(mockPrismaService.user.findUnique as jest.Mock).mockResolvedValue(
			mockUsers[0],
		)
		const user = await service.getUserById("123")
		expect(user).toEqual(mockUsers[0])
	})
	it("should create a new user", async () => {
		;(mockPrismaService.user.findUnique as jest.Mock).mockResolvedValue(null)
		jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword" as never)
		;(mockPrismaService.user.create as jest.Mock).mockResolvedValue({
			id: "123",
			name: "John",
			email: "john@example.com",
		})

		const newUser = await service.createUser({
			name: "John",
			email: "john@example.com",
			password: "123456",
		})

		expect(newUser).toEqual({
			id: "123",
			name: "John",
			email: "john@example.com",
		})
	})
	it("should throw if email is already in use", async () => {
		;(mockPrismaService.user.findUnique as jest.Mock).mockResolvedValue(
			mockUsers[0],
		)
		await expect(
			service.createUser({
				name: "John",
				email: "john@example.com",
				password: "123456",
			}),
		).rejects.toThrow("Este e-mail já está em uso")
	})
})
