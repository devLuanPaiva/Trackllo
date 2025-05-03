import { IBoard } from "../models"
import { mockColumns } from "./mock-columns"

export const mockBoards: IBoard[] = [
	{
		id: "board-1",
		title: "Projeto Kanban",
		userId: "user-1",
		columns: mockColumns,
	},
]
