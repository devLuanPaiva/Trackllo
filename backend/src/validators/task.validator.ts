import { validator } from "hono/validator";
import { z } from "zod";

const formatZodErrors = (errors: z.ZodIssue[]) => {
  return errors.map((err) => ({
    campo: err.path.join("."),
    mensagem: err.message,
  }));
};

export default {
  taskId: validator("param", (value, c) => {
    const schema = z.object({
      id: z
        .string()
        .uuid({ message: "O ID da tarefa deve ser um UUID válido." }),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      return c.json(
        {
          erro: "ID da tarefa inválido.",
          detalhes: formatZodErrors(result.error.errors),
        },
        400
      );
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
      return c.json(
        {
          erro: "Erro de validação ao criar tarefa.",
          detalhes: formatZodErrors(result.error.errors),
        },
        400
      );
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
      return c.json(
        {
          erro: "Erro de validação ao atualizar tarefa.",
          detalhes: formatZodErrors(result.error.errors),
        },
        400
      );
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
      return c.json(
        {
          erro: "Erro ao mover tarefa.",
          detalhes: formatZodErrors(result.error.errors),
        },
        400
      );
    }

    return result.data;
  }),
};
