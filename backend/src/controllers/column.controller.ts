import { Hono } from "hono";
import ColumnService from "../services/column.service";
import { successResponse, errorResponse } from "../utils/apiResponse";
import validator from "../validators/column.validator";
import { authMiddleware } from "../middleware/auth.middleware";

const columnRoutes = new Hono();

columnRoutes.use("*", authMiddleware)


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
    if (error.message === "Quadro não encontrado ou não pertence ao usuário.") {
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
      return errorResponse(c, "Coluna não encontrada.", 404);
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
    if (error.message === "Quadro não encontrado ou não pertence ao usuário.") {
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
      if (error.message === "Coluna não encontrada ou não pertence ao usuário.") {
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
    if (error.message === "Coluna não encontrada ou não pertence ao usuário.") {
      return errorResponse(c, error.message, 404);
    }
    return errorResponse(c, error.message, 400);
  }
});

export default columnRoutes;
