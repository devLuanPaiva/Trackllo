import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ColumnController } from "./column.controller";
import { ColumnService } from "./column.service";
import { DatabaseModule } from "../database/database.module";
import { AuthMiddleware } from "../middlewares/auth.middleware";

@Module({
    imports: [DatabaseModule],
    controllers: [ColumnController],
    providers: [ColumnService],
})
export class ColumnModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(ColumnController);
    }
}