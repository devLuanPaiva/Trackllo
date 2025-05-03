import { Response } from "express"

export function successResponse<T>(res: Response, data: T, status = 200) {
	return res.status(status).json({
		success: true,
		data,
	})
}

export function errorResponse(
	res: Response,
	message: string,
	status = 400,
	errors?: any[],
) {
	return res.status(status).json({
		success: false,
		error: {
			message,
			...(errors && { errors }),
		},
	})
}
