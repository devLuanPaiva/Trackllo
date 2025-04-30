import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Req, Res } from "@nestjs/common";
import { Response, Request } from 'express';
import { BoardService } from "./board.service";
import { CreateBoardDto } from "./board.dto";
import { successResponse, errorResponse } from '../utils/global-response';

@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: BoardService) { }

    @Get()
    async getAllBoards(@Req() req: Request, @Res() res: Response) {
        try {
            const userId = req['userId'];
            const boards = await this.boardService.getUserBoards(userId);
            return successResponse(res, boards);
        } catch (error) {
            return errorResponse(res, 'Erro ao buscar quadros', 500, [error.message]);
        }
    }

    @Get(':id')
    async getBoardById(
        @Param('id', ParseUUIDPipe) id: string,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        try {
            const userId = req['userId'];
            const board = await this.boardService.getBoardById(id, userId);
            return successResponse(res, board);
        } catch (error) {
            return errorResponse(res, 'Erro ao buscar quadro', 500, [error.message]);
        }
    }

    @Post()
    async createBoard(@Body() body: CreateBoardDto, @Req() req: Request, @Res() res: Response) {
        try {
            const userId = req['userId'];
            const newBoard = await this.boardService.createBoard(userId, body.title);
            return successResponse(res, newBoard, 201);
        } catch (error) {
            return errorResponse(res, 'Erro ao criar quadro', 500, [error.message]);
        }
    }

    @Delete(':id')
    async deleteBoard(
        @Param('id', ParseUUIDPipe) id: string,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        try {
            const userId = req['userId'];
            await this.boardService.deleteBoard(id, userId);
            return successResponse(res, { message: 'Quadro deletado com sucesso' });
        } catch (error) {
            return errorResponse(res, 'Erro ao deletar quadro', 500, [error.message]);
        }
    }
}
