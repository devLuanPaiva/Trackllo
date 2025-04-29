import { IsEmail, IsOptional, IsString, MinLength, IsUUID } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}

export class LoginUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}

export class UserIdParam {
    @IsUUID()
    id: string;
}



