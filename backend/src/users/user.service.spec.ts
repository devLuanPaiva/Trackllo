import { UsersService } from "./users.service"
import { PrismaProvider } from "../database/prisma.provider"
import { mockUsers } from "../mocks"

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
})
