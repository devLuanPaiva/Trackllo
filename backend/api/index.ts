import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from '@hono/node-server/vercel'
import errorHandler from "../src/utils/errorHandler";
import { disconnectPrisma } from "../src/database/db";
import userRoutes from "../src/controllers/user.controller";
import taskRoutes from "../src/controllers/task.controller";
import boardRoutes from "../src/controllers/board.controller";
import columnRoutes from "../src/controllers/column.controller";

const app = new Hono().basePath("/api");

app.use("*", cors({
  origin: (origin) => {
    const allowedOrigins = [
      "http://localhost:4200",
      "https://trackllo.vercel.app"
    ];
    return origin && allowedOrigins.includes(origin) ? origin : "";
  },
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

app.use("*", async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  await next();
  await disconnectPrisma();
});

app.get("/", (c) => c.text("Hello Hono!"));
app.route("/users", userRoutes);
app.route("/tasks", taskRoutes);
app.route("/boards", boardRoutes);
app.route("/columns", columnRoutes);
app.onError(errorHandler);

export default handle(app);
