import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Req,
    Res,
    ParseUUIDPipe

} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateColumnDto, UpdateColumnDto } from './column.dto';
import { successResponse, errorResponse } from '../utils/global-response';
import { ColumnService } from './column.service';

@Controller('columns')
export class ColumnController {
    constructor(private readonly columnService: ColumnService) { }
    @Get('board/:boardId')
    async getBoardColumns(
        @Param('boardId', ParseUUIDPipe) boardId: string,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const userId = req['userId'];

        try {
            const columns = await this.columnService.getBoardColumns(boardId, userId);
            return successResponse(res, columns);
        } catch (error: any) {
            const status = error.message.includes('não pertence')
                ? 404
                : 500;
            return errorResponse(res, error.message, status);
        }
    }

    @Get(':id')
    async getColumnById(
        @Param('id', ParseUUIDPipe) id: string,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const userId = req['userId'];

        try {
            const column = await this.columnService.getColumnById(id, userId);
            if (!column) {
                return errorResponse(res, 'Coluna não encontrada.', 404);
            }
            return successResponse(res, column);
        } catch (error: any) {
            return errorResponse(res, error.message, 500);
        }
    }

    @Post()
    async createColumn(
        @Body() body: CreateColumnDto,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const userId = req['userId'];

        try {
            const newColumn = await this.columnService.createColumn(
                body.boardId,
                userId,
                body.title,
            );
            return successResponse(res, newColumn, 201);
        } catch (error: any) {
            const status = error.message.includes('não pertence') ? 404 : 400;
            return errorResponse(res, error.message, status);
        }
    }

    @Put(':id')
    async updateColumn(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() body: UpdateColumnDto,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const userId = req['userId'];

        try {
            const updated = await this.columnService.updateColumn(id, userId, body);
            return successResponse(res, updated);
        } catch (error: any) {
            const status = error.message.includes('não pertence') ? 404 : 400;
            return errorResponse(res, error.message, status);
        }
    }

    @Delete(':id')
    async deleteColumn(
        @Param('id', ParseUUIDPipe) id: string,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const userId = req['userId'];

        try {
            const deleted = await this.columnService.deleteColumn(id, userId);
            return successResponse(res, deleted);
        } catch (error: any) {
            const status = error.message.includes('não pertence') ? 404 : 400;
            return errorResponse(res, error.message, status);
        }
    }
}
