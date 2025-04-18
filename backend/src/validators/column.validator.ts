import { validator } from "hono/validator";
import { z } from "zod";

export default {
  columnId: validator("param", (value, c) => {
    const schema = z.object({
      id: z.string().uuid(),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      return c.json(
        {
          error:
            "ID da coluna inválido. Certifique-se de que seja válido.",
        },
        400
      );
    }
    return result.data;
  }),

  boardId: validator("param", (value, c) => {
    const schema = z.object({
      boardId: z.string().uuid(),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      return c.json(
        { error: "ID do quadro inválido. Verifique se é válido." },
        400
      );
    }
    return result.data;
  }),

  createColumn: validator("json", (value, c) => {
    const schema = z.object({
      boardId: z.string().uuid(),
      title: z.string().min(3).max(50),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      return c.json(
        {
          error:
            "Dados inválidos ao criar coluna. Verifique o título (mín. 3, máx. 50 caracteres) e o ID do quadro.",
        },
        400
      );
    }
    return result.data;
  }),

  updateColumn: validator("json", (value, c) => {
    const schema = z.object({
      title: z.string().min(3).max(50),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      return c.json(
        {
          error:
            "Título inválido. O título deve conter entre 3 e 50 caracteres.",
        },
        400
      );
    }
    return result.data;
  }),
};
