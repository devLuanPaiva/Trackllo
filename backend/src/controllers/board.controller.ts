import { Hono } from "hono";
import BoardService from "../services/board.service";
import { successResponse, errorResponse } from "../utils/apiResponse";
import validator from "../validators/board.validator";
import { authMiddleware } from "../middleware/auth.middleware";

const boardRoutes = new Hono();

boardRoutes.use("*", authMiddleware)


boardRoutes.get("/", async (c) => {
  const userId = c.get("userId" as never);

  try {
    const boards = await BoardService.getUserBoards(userId as string);
    return successResponse(c, boards);
  } catch (error: any) {
    return errorResponse(c, error.message, 500);
  }
});

boardRoutes.get("/:id", validator.boardId, async (c) => {
  const { id } = c.req.valid("param");
  const userId = c.get("userId" as never);

  try {
    const board = await BoardService.getBoardById(id, userId as string);
    if (!board) {
      return errorResponse(c, "Board not found", 404);
    }
    return successResponse(c, board);
  } catch (error: any) {
    return errorResponse(c, error.message, 500);
  }
});

boardRoutes.post("/", validator.createBoard, async (c) => {
  const data = c.req.valid("json");
  const userId = c.get("userId" as never);

  try {
    const newBoard = await BoardService.createBoard(
      userId as string,
      data.title
    );
    return successResponse(c, newBoard, 201);
  } catch (error: any) {
    if (error.message === "User not found") {
      return errorResponse(c, error.message, 404);
    }
    return errorResponse(c, error.message, 400);
  }
});

boardRoutes.delete("/:id", validator.boardId, async (c) => {
  const { id } = c.req.valid("param");
  const userId = c.get("userId" as never);

  try {
    const deletedBoard = await BoardService.deleteBoard(id, userId as string);
    return successResponse(c, deletedBoard);
  } catch (error: any) {
    if (error.message === "Board not found or not owned by user") {
      return errorResponse(c, error.message, 404);
    }
    return errorResponse(c, error.message, 400);
  }
});

export default boardRoutes;
