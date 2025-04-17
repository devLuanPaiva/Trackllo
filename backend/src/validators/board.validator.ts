import { validator } from "hono/validator";
import { z } from "zod";

export default {
  boardId: validator("param", (value, c) => {
    const schema = z.object({
      id: z.string().uuid({
        message: "O ID do quadro deve ser válido.",
      }),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message);
      return c.json({ error: messages }, 400);
    }
    return result.data;
  }),
  createBoard: validator("json", (value, c) => {
    const schema = z.object({
      title: z
        .string({
          required_error: "O título do quadro é obrigatório.",
          invalid_type_error: "O título deve ser uma string.",
        })
        .min(3, { message: "O título deve ter no mínimo 3 caracteres." })
        .max(100, { message: "O título deve ter no máximo 100 caracteres." }),
    });

    const result = schema.safeParse(value);
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message);
      return c.json({ error: messages }, 400);
    }
    return result.data;
  }),
};
