import { IsNotEmpty, MaxLength } from 'class-validator';

export class RegisterDto {
	@IsNotEmpty()
	@MaxLength(20)
	username: string;

	@IsNotEmpty()
	password: string;
}
