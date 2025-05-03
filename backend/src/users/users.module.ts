import { DatabaseModule } from "../database/database.module"
import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"

@Module({
	imports: [DatabaseModule],
	exports: [UsersService],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
