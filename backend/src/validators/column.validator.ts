import { validator } from "hono/validator";
import { errorResponse } from "../utils/apiResponse";
import { z } from "zod";

export default {
  columnId: validator("param", (value, c) => {
    const schema = z.object({
      id: z.string().uuid(),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      return errorResponse(c, "ID inválido", 400, result.error.errors);
    }
    return result.data;
  }),

  boardId: validator("param", (value, c) => {
    const schema = z.object({
      boardId: z.string().uuid({ message: "ID do quadro inválido." }),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      return errorResponse(c, "ID inválido", 400, result.error.errors);
    }
    return result.data;
  }),

  createColumn: validator("json", (value, c) => {
    const schema = z.object({
      boardId: z.string().uuid({ message: "ID do quadro inválido." }),
      title: z
        .string()
        .min(3, { message: "O título deve ter pelo menos 3 caracteres." })
        .max(50, { message: "O título deve ter no máximo 50 caracteres." }),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      return errorResponse(c, "Erro de validação", 400, result.error.errors);
    }
    return result.data;
  }),

  updateColumn: validator("json", (value, c) => {
    const schema = z.object({
      title: z
        .string()
        .min(3, { message: "O título deve ter pelo menos 3 caracteres." })
        .max(50, { message: "O título deve ter no máximo 50 caracteres." }),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      return errorResponse(c, "Erro de validação", 400, result.error.errors);
    }
    return result.data;
  }),
};
