import { IsString, IsNotEmpty, Length, IsUUID } from "class-validator"

export class CreateBoardDto {
	@IsString({ message: "O título deve ser uma string." })
	@IsNotEmpty({ message: "O título do quadro é obrigatório." })
	@Length(3, 100, {
		message: "O título deve ter entre 3 e 100 caracteres.",
	})
	title: string
}
export class ParamIdDto {
	@IsUUID("4", { message: "O ID do quadro deve ser válido." })
	id: string
}
