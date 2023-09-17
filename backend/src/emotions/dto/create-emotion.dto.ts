import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { EEmotion } from '../enums/emotions.enum';
import { EReason } from '../enums/reason.enum';

export class CreateEmotionDto {
	// To identify the entry
	@IsNotEmpty()
	date: string;

	@IsEnum(EEmotion)
	@IsNotEmpty()
	emotion: EEmotion;

	@IsEnum(EReason)
	@IsNotEmpty()
	reason: EReason;

	@IsOptional()
	journal: string;
}
