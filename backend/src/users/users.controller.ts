import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto, UserIdParam } from './users.dto';
import { successResponse, errorResponse } from '../utils/global-response'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getAll(@Res() res: Response) {
        try {
            const users = await this.usersService.getAllUsers();
            return successResponse(res, users);
        } catch (error) {
            console.error(error);
            return errorResponse(res, 'Erro ao buscar usuários', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getById(@Param() params: UserIdParam, @Res() res: Response) {
        try {
            const user = await this.usersService.getUserById(params.id);
            if (!user) return errorResponse(res, 'Usuário não encontrado', HttpStatus.NOT_FOUND);
            return successResponse(res, user);
        } catch (error) {
            return errorResponse(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async create(@Body() body: CreateUserDto, @Res() res: Response) {
        try {
            const newUser = await this.usersService.createUser(body);
            return successResponse(res, newUser, HttpStatus.CREATED);
        } catch (error) {
            const status = error.message.includes('e-mail já está em uso') ? HttpStatus.CONFLICT : HttpStatus.BAD_REQUEST;
            return errorResponse(res, error.message, status);
        }
    }

    @Post('login')
    async login(@Body() body: LoginUserDto, @Res() res: Response) {
        try {
            const { user, token } = await this.usersService.loginUser(body.email, body.password);
            return successResponse(res, { user, token });
        } catch (error) {
            const status = error.message.includes('inválidas') ? HttpStatus.UNAUTHORIZED : HttpStatus.INTERNAL_SERVER_ERROR;
            return errorResponse(res, error.message, status);
        }
    }

    @Put(':id')
    async update(@Param() params: UserIdParam, @Body() body: UpdateUserDto, @Res() res: Response) {
        try {
            const updatedUser = await this.usersService.updateUser(params.id, body);
            return successResponse(res, updatedUser);
        } catch (error) {
            return errorResponse(res, error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param() params: UserIdParam, @Res() res: Response) {
        try {
            const deletedUser = await this.usersService.deleteUser(params.id);
            return successResponse(res, deletedUser);
        } catch (error) {
            const status = error.message.includes('não encontrado') ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;
            return errorResponse(res, error.message, status);
        }
    }
}
