import { Hono } from "hono";
import UserService from "../services/user.service";
import validator from "../validators/user.validator";
import { successResponse, errorResponse } from "../utils/apiResponse";

const userRoutes = new Hono();

userRoutes.get("/", async (c) => {
  try {
    const users = await UserService.getAllUsers();
    return successResponse(c, users);
  } catch (error) {
    console.error(error);
    return errorResponse(c, "Failed to get users", 500);
  }
});

userRoutes.get("/:id", validator.userId, async (c) => {
  const { id } = c.req.valid("param");

  try {
    const user = await UserService.getUserById(id);
    if (!user) {
      return errorResponse(c, "User not found", 404);
    }
    return successResponse(c, user);
  } catch (error: any) {
    return errorResponse(c, error.message, 500);
  }
});
userRoutes.post("/", validator.createUser, async (c) => {
  const data = c.req.valid("json");

  try {
    const newUser = await UserService.createUser(data);
    return successResponse(c, newUser, 201);
  } catch (error: any) {
    if (error.message === "Email already in use") {
      return errorResponse(c, error.message, 409);
    }
    return errorResponse(c, error.message, 400);
  }
});

userRoutes.post("/login", validator.loginUser, async (c) => {
  const { email, password } = c.req.valid("json");

  try {
    const { user, token } = await UserService.loginUser(email, password);
    return successResponse(c, {
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      return errorResponse(c, "Email ou senha inválidos", 401);
    }
    return errorResponse(c, error.message, 500);
  }
});

userRoutes.put("/:id", validator.userId, validator.updateUser, async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");

  try {
    const updatedUser = await UserService.updateUser(id, data);
    return successResponse(c, updatedUser);
  } catch (error: any) {
    return errorResponse(c, error.message, 400);
  }
});

userRoutes.delete("/:id", validator.userId, async (c) => {
  const { id } = c.req.valid("param");

  try {
    const deletedUser = await UserService.deleteUser(id);
    return successResponse(c, deletedUser);
  } catch (error: any) {
    if (error.message === "User not found") {
      return errorResponse(c, error.message, 404);
    }
    return errorResponse(c, error.message, 400);
  }
});

export default userRoutes;
