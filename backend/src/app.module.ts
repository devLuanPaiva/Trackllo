import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { BoardModule } from './board/board.module';
import { ColumnModule } from './column/column.module';

@Module({
  imports: [DatabaseModule, UsersModule, BoardModule, ColumnModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
