import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	Req,
	Res,
	Query,
	ParseUUIDPipe,
} from "@nestjs/common"
import { TasksService } from "./tasks.service"
import { CreateTaskDto, MoveTaskDto, UpdateTaskDto } from "./task.dto"
import { Request, Response } from "express"
import { successResponse, errorResponse } from "../utils/global-response"

@Controller("tasks")
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Get()
	async getAll(
		@Req() req: Request,
		@Query("columnId") columnId: string,
		@Res() res: Response,
	) {
		const userId = req["userId"] as string
		try {
			const tasks = await this.tasksService.getAllTasks(userId, columnId)
			return successResponse(res, tasks)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao buscar tarefas", 500, [errorMessage])
		}
	}

	@Get(":id")
	async getOne(
		@Param("id", ParseUUIDPipe) id: string,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const userId = req["userId"] as string
		try {
			const task = await this.tasksService.getTaskById(id, userId)
			if (!task) {
				return errorResponse(res, "Tarefa não encontrada.", 404)
			}
			return successResponse(res, task)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao buscar tarefa", 500, [errorMessage])
		}
	}

	@Post()
	async create(
		@Body() dto: CreateTaskDto,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const userId = req["userId"] as string
		try {
			const task = await this.tasksService.createTask(
				userId,
				dto.title,
				dto.description,
				dto.columnId,
				dto.image,
			)
			return successResponse(res, task, 201)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao buscar tarefa", 500, [errorMessage])
		}
	}

	@Put(":id")
	async update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() dto: UpdateTaskDto,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const userId = req["userId"] as string
		try {
			const updated = await this.tasksService.updateTask(
				id,
				userId,
				dto.title,
				dto.description,
				dto.columnId,
				dto.image,
			)
			return successResponse(res, updated)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao buscar tarefa", 500, [errorMessage])
		}
	}

	@Delete(":id")
	async delete(
		@Param("id", ParseUUIDPipe) id: string,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const userId = req["userId"] as string
		try {
			const deleted = await this.tasksService.deleteTask(id, userId)
			return successResponse(res, deleted)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao buscar tarefa", 500, [errorMessage])
		}
	}

	@Patch(":id/move")
	async move(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() dto: MoveTaskDto,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const userId = req["userId"] as string
		try {
			const moved = await this.tasksService.moveTask(id, userId, dto.columnId)
			return successResponse(res, moved)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erro desconhecido"
			return errorResponse(res, "Erro ao buscar tarefa", 500, [errorMessage])
		}
	}
}
