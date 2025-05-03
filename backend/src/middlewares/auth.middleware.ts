import {
	Injectable,
	NestMiddleware,
	UnauthorizedException,
} from "@nestjs/common"
import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"

interface CustomRequest extends Request {
	userId?: string
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	use(req: CustomRequest, res: Response, next: NextFunction) {
		const authHeader =
			typeof req.headers["authorization"] === "string"
				? req.headers["authorization"]
				: undefined
		const SECRET = process.env.JWT_SECRET ?? "secrettoken"

		if (!authHeader?.startsWith("Bearer ")) {
			throw new UnauthorizedException("Unauthorized")
		}

		const token = authHeader.split(" ")[1]

		try {
			const decoded = jwt.verify(token, SECRET) as { id: string }
			req.userId = decoded.id
			next()
		} catch (err) {
			console.log(err)
			throw new UnauthorizedException("Invalid token")
		}
	}
}
