import {
	BadRequestException,
	ConflictException,
	Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,

		private readonly authService: AuthService,
	) {}

	async register(registerDto: RegisterDto) {
		const newUser = new User();
		newUser.username = registerDto.username;
		newUser.password_hash = await bcrypt.hash(registerDto.password, 10);

		let savedUser: User;
		try {
			savedUser = await this.usersRepository.save(newUser);
		} catch (error) {
			// Catch duplicate username error
			if (error.code === '23505')
				throw new ConflictException('Username already taken');
			else
				throw new BadRequestException(
					'An error occured while creating user',
				);
		}

		// Sign JWT token
		const token = this.authService.signUserToken(savedUser);

		return {
			token,
		};
	}

	async login(loginDto: LoginDto) {
		const user = await this.usersRepository.findOne({
			where: { username: loginDto.username },
			select: ['id', 'username', 'password_hash'],
		});
		if (!user) throw new BadRequestException('Invalid credentials');

		const passwordMatch = await bcrypt.compare(
			loginDto.password,
			user.password_hash,
		);
		if (!passwordMatch)
			throw new BadRequestException('Invalid credentials');

		// Sign JWT token
		const token = this.authService.signUserToken(user);

		return {
			token,
		};
	}

	async me(id: number) {
		return this.usersRepository.findOne({
			where: { id },
			select: ['id', 'username'],
		});
	}
}
