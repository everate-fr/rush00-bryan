import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEntryDto {
	@IsNotEmpty()
	date: string;

	@IsOptional()
	journal: string;
}
