import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Req,
	Res,
	NotFoundException,
} from "@nestjs/common"
import { Response, Request } from "express"
import { BoardService } from "./board.service"
import { CreateBoardDto } from "./board.dto"
import { successResponse, errorResponse } from "../utils/global-response"

@Controller("boards")
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@Get()
	async getAllBoards(@Req() req: Request, @Res() res: Response) {
		try {
			const userId = req["userId"] as string
			const boards = await this.boardService.getUserBoards(userId)
			return successResponse(res, boards)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao buscar quadros", 500, [errorMessage])
		}
	}

	@Get(":id")
	async getBoardById(
		@Param("id", ParseUUIDPipe) id: string,
		@Req() req: Request,
		@Res() res: Response,
	) {
		try {
			const userId = req["userId"] as string
			const board = await this.boardService.getBoardById(id, userId)

			if (!board) {
				return errorResponse(res, "Quadro não encontrado", 404)
			}

			return successResponse(res, board)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao buscar quadro", 500, [errorMessage])
		}
	}

	@Post()
	async createBoard(
		@Body() body: CreateBoardDto,
		@Req() req: Request,
		@Res() res: Response,
	) {
		try {
			const userId = req["userId"] as string
			const newBoard = await this.boardService.createBoard(userId, body.title)
			return successResponse(res, newBoard, 201)
		} catch (error) {
			const status = error instanceof NotFoundException ? 404 : 500
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao criar quadro", status, [errorMessage])
		}
	}

	@Delete(":id")
	async deleteBoard(
		@Param("id", ParseUUIDPipe) id: string,
		@Req() req: Request,
		@Res() res: Response,
	) {
		try {
			const userId = req["userId"] as string
			const deletedBoard = await this.boardService.deleteBoard(id, userId)

			if (!deletedBoard) {
				return errorResponse(res, "Quadro não encontrado", 404)
			}

			return successResponse(res, { message: "Quadro deletado com sucesso" })
		} catch (error) {
			const status = error instanceof NotFoundException ? 404 : 500
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao deletar quadro", status, [
				errorMessage,
			])
		}
	}
}
