import { AuthMiddleware } from "./auth.middleware"
import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"

interface CustomRequest extends Request {
	userId?: string
}

const mockRequest = (authHeader?: string): CustomRequest => {
	return {
		headers: {
			authorization: authHeader,
		},
	} as unknown as CustomRequest
}

const mockResponse = {} as Response
const mockNext: NextFunction = jest.fn()

describe("AuthMiddleware", () => {
	const middleware = new AuthMiddleware()
	const SECRET = process.env.JWT_SECRET ?? "secrettoken"

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("should call next() if token is valid", () => {
		const token = jwt.sign({ id: "123" }, SECRET)
		const req = mockRequest(`Bearer ${token}`)

		middleware.use(req, mockResponse, mockNext)

		expect(req.userId).toBe("123")
		expect(mockNext).toHaveBeenCalled()
	})
})
