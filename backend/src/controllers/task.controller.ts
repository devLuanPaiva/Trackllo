import { Hono } from "hono";
import TaskService from "../services/task.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import validator from "../validators/task.validator.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "secrettoken";
const taskRoutes = new Hono();

taskRoutes.use("*", async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return errorResponse(c, "Missing or invalid Authorization header", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    if (!payload.userId) {
      return errorResponse(c, "Invalid token payload", 401);
    }

    c.set("userId" as never, payload.userId);
    await next();
  } catch (err) {
    return errorResponse(c, "Invalid or expired token", 401);
  }
});

taskRoutes.get("/", async (c) => {
  const userId = c.get("userId" as never);

  try {
    const tasks = await TaskService.getAllTasks(userId as string);
    return successResponse(c, tasks);
  } catch (error: any) {
    return errorResponse(c, error.message, 500);
  }
});

taskRoutes.get("/:id", validator.taskId, async (c) => {
  const { id } = c.req.valid("param");
  const userId = c.get<never>("userId" as never);

  try {
    const task = await TaskService.getTaskById(id, userId as string);
    if (!task) {
      return errorResponse(c, "Task not found", 404);
    }
    return successResponse(c, task);
  } catch (error: any) {
    return errorResponse(c, error.message, 500);
  }
});

taskRoutes.post("/", validator.createTask, async (c) => {
  const data = c.req.valid("json");
  const userId = c.get("userId" as never);

  try {
    const newTask = await TaskService.createTask({
      ...data,
      userId: userId as string,
    });

    return successResponse(c, newTask, 201);
  } catch (error: any) {
    if (error.message === "User not found") {
      return errorResponse(c, error.message, 404);
    }
    return errorResponse(c, error.message, 400);
  }
});

taskRoutes.put("/:id", validator.taskId, validator.updateTask, async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  const userId = c.get<never>("userId" as never);

  try {
    const updatedTask = await TaskService.updateTask(
      id,
      userId as string,
      data
    );
    return successResponse(c, updatedTask);
  } catch (error: any) {
    if (error.message === "Task not found or not owned by user") {
      return errorResponse(c, error.message, 404);
    }
    return errorResponse(c, error.message, 400);
  }
});

taskRoutes.delete("/:id", validator.taskId, async (c) => {
  const { id } = c.req.valid("param");
  const userId = c.get<never>("userId" as never);

  try {
    const deletedTask = await TaskService.deleteTask(id, userId as string);
    return successResponse(c, deletedTask);
  } catch (error: any) {
    if (error.message === "Task not found or not owned by user") {
      return errorResponse(c, error.message, 404);
    }
    return errorResponse(c, error.message, 400);
  }
});

taskRoutes.patch(
  "/:id/move",
  validator.taskId,
  validator.moveTask,
  async (c) => {
    const { id } = c.req.valid("param");
    const { columnId } = c.req.valid("json");
    const userId = c.get<never>("userId" as never);

    try {
      const movedTask = await TaskService.moveTask(
        id,
        userId as string,
        columnId
      );
      return successResponse(c, movedTask);
    } catch (error: any) {
      if (error.message === "Task not found or not owned by user") {
        return errorResponse(c, error.message, 404);
      }
      return errorResponse(c, error.message, 400);
    }
  }
);

export default taskRoutes;
