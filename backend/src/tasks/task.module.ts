import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TasksController } from "./task.controller";
import { TasksService } from "./tasks.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { DatabaseModule } from "../database/database.module";
@Module({
    imports: [DatabaseModule],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TaskModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(TasksController);
    }
}