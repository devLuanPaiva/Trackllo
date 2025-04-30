import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { DatabaseModule } from "../database/database.module";
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
    imports: [DatabaseModule],
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(BoardController);
    }
}