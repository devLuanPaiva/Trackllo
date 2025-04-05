import { Hono } from "hono";
import ColumnService from "../services/column.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import validator from "../validators/column.validator.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "secrettoken";
const columnRoutes = new Hono();

columnRoutes.use("*", async (c, next) => {
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

columnRoutes.get("/board/:boardId", validator.boardId, async (c) => {
  const { boardId } = c.req.valid("param");
  const userId = c.get("userId" as never);

  try {
    const columns = await ColumnService.getBoardColumns(
      boardId,
      userId as string
    );
    return successResponse(c, columns);
  } catch (error: any) {
    if (error.message === "Board not found or not owned by user") {
      return errorResponse(c, error.message, 404);
    }
    return errorResponse(c, error.message, 500);
  }
});

columnRoutes.get("/:id", validator.columnId, async (c) => {
  const { id } = c.req.valid("param");
  const userId = c.get("userId" as never);

  try {
    const column = await ColumnService.getColumnById(id, userId as string);
    if (!column) {
      return errorResponse(c, "Column not found", 404);
    }
    return successResponse(c, column);
  } catch (error: any) {
    return errorResponse(c, error.message, 500);
  }
});

columnRoutes.post("/", validator.createColumn, async (c) => {
  const { boardId, title } = c.req.valid("json");
  const userId = c.get("userId" as never);

  try {
    const newColumn = await ColumnService.createColumn(
      boardId,
      userId as string,
      title
    );
    return successResponse(c, newColumn, 201);
  } catch (error: any) {
    if (error.message === "Board not found or not owned by user") {
      return errorResponse(c, error.message, 404);
    }
    return errorResponse(c, error.message, 400);
  }
});

columnRoutes.put(
  "/:id",
  validator.columnId,
  validator.updateColumn,
  async (c) => {
    const { id } = c.req.valid("param");
    const { title } = c.req.valid("json");
    const userId = c.get("userId" as never);

    try {
      const updatedColumn = await ColumnService.updateColumn(
        id,
        userId as string,
        { title }
      );
      return successResponse(c, updatedColumn);
    } catch (error: any) {
      if (error.message === "Column not found or not owned by user") {
        return errorResponse(c, error.message, 404);
      }
      return errorResponse(c, error.message, 400);
    }
  }
);

columnRoutes.delete("/:id", validator.columnId, async (c) => {
  const { id } = c.req.valid("param");
  const userId = c.get("userId" as never);

  try {
    const deletedColumn = await ColumnService.deleteColumn(
      id,
      userId as string
    );
    return successResponse(c, deletedColumn);
  } catch (error: any) {
    if (error.message === "Column not found or not owned by user") {
      return errorResponse(c, error.message, 404);
    }
    return errorResponse(c, error.message, 400);
  }
});

export default columnRoutes;
