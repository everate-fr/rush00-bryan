import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';

import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('/api/v1/users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('/me')
	@UseGuards(JwtAuthGuard)
	me(@Req() req) {
		return this.usersService.me(req.user.id);
	}

	@Post('/register')
	register(@Body() registerDto: RegisterDto) {
		return this.usersService.register(registerDto);
	}

	@Post('/login')
	login(@Body() loginDto: LoginDto) {
		return this.usersService.login(loginDto);
	}
}
