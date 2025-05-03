import { IColumn } from "../models"
import { mockTasks } from "./mock-tasks"

export const mockColumns: IColumn[] = [
	{
		id: "column-todo",
		title: "To do",
		tasks: mockTasks.filter((task) => task.columnId === "column-todo"),
	},
	{
		id: "column-in-progress",
		title: "In Progress",
		tasks: mockTasks.filter((task) => task.columnId === "column-in-progress"),
	},
	{
		id: "column-done",
		title: "Done",
		tasks: mockTasks.filter((task) => task.columnId === "column-done"),
	},
]
