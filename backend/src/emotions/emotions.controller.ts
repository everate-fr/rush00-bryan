import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';

import { EmotionsService } from './emotions.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateEmotionDto } from './dto/create-emotion.dto';

@Controller('/api/v1/emotions')
export class EmotionsController {
	constructor(private readonly emotionsService: EmotionsService) {}

	@Post('/')
	@UseGuards(JwtAuthGuard)
	create(@Req() request, @Body() createEmotionDto: CreateEmotionDto) {
		return this.emotionsService.create(createEmotionDto, request.user);
	}
}
