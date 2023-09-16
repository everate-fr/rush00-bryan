import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService) {}

	signUserToken(user: User) {
		return this.jwtService.sign({
			id: user.id,
			username: user.username,
		});
	}
}
