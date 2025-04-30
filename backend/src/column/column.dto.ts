import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateColumnDto {
    @IsUUID()
    boardId: string;

    @IsNotEmpty()
    @Length(3, 50)
    title: string;
}

export class UpdateColumnDto {
    @IsNotEmpty()
    @Length(3, 50)
    title: string;
}
