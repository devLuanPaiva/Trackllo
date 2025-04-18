import { validator } from "hono/validator";
import { errorResponse } from "../utils/apiResponse";
import { z } from "zod";

export default {
  taskId: validator("param", (value, c) => {
    const schema = z.object({
      id: z
        .string()
        .uuid({ message: "O ID da tarefa deve ser um UUID válido." }),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      return errorResponse(c, "ID inválido", 400, result.error.errors);
    }

    return result.data;
  }),

  createTask: validator("json", (value, c) => {
    const schema = z.object({
      title: z
        .string()
        .min(3, { message: "O título deve ter pelo menos 3 caracteres." })
        .max(100, { message: "O título deve ter no máximo 100 caracteres." }),
      description: z
        .string()
        .min(10, { message: "A descrição deve ter pelo menos 10 caracteres." })
        .max(500, {
          message: "A descrição deve ter no máximo 500 caracteres.",
        }),
      image: z
        .union([
          z.string().url({ message: "A imagem deve ser uma URL válida." }),
          z.literal(""),
        ])
        .optional(),
      columnId: z
        .string()
        .uuid({ message: "O ID da coluna deve ser um UUID válido." }),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      return errorResponse(c, "Erro de validação", 400, result.error.errors);
    }

    return result.data;
  }),

  updateTask: validator("json", (value, c) => {
    const schema = z.object({
      title: z
        .string()
        .min(3, { message: "O título deve ter pelo menos 3 caracteres." })
        .max(100, { message: "O título deve ter no máximo 100 caracteres." }),
      description: z
        .string()
        .min(10, { message: "A descrição deve ter pelo menos 10 caracteres." })
        .max(500, { message: "A descrição deve ter no máximo 500 caracteres." })
        .optional(),
      image: z
        .string()
        .url({ message: "A imagem deve ser uma URL válida." })
        .optional()
        .or(z.literal("").transform(() => null)),
      columnId: z
        .string()
        .uuid({ message: "O ID da coluna deve ser um UUID válido." }),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      return errorResponse(c, "Erro de validação", 400, result.error.errors);
    }

    return result.data;
  }),

  moveTask: validator("json", (value, c) => {
    const schema = z.object({
      columnId: z
        .string()
        .uuid({ message: "O ID da coluna deve ser um UUID válido." }),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      return errorResponse(c, "Erro de validação", 400, result.error.errors);
    }

    return result.data;
  }),
};
