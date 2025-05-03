import { IsOptional, IsString, IsUUID, IsUrl, Length } from "class-validator"

export class CreateTaskDto {
	@IsString()
	@Length(3, 100)
	title: string

	@IsString()
	@Length(10, 500)
	description: string

	@IsOptional()
	@IsUrl({}, { message: "A imagem deve ser uma URL válida." })
	image?: string

	@IsUUID()
	columnId: string
}
export class UpdateTaskDto {
	@IsString()
	@Length(3, 100)
	title: string

	@IsString()
	@Length(10, 500)
	description: string

	@IsOptional()
	@IsUrl({}, { message: "A imagem deve ser uma URL válida." })
	image?: string

	@IsUUID()
	columnId: string
}
export class MoveTaskDto {
	@IsUUID()
	columnId: string
}
