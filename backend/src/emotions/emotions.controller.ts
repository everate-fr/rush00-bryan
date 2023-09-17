import {
	Controller,
	Post,
	Body,
	UseGuards,
	Req,
	Get,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';

import { EmotionsService } from './emotions.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { UpdateEmotionDto } from './dto/update-emotion.dto';

@Controller('/api/v1/emotions')
export class EmotionsController {
	constructor(private readonly emotionsService: EmotionsService) {}

	@Get('/')
	@UseGuards(JwtAuthGuard)
	findAll(@Req() request) {
		return this.emotionsService.findAll(request.user);
	}

	@Get('/:date')
	@UseGuards(JwtAuthGuard)
	findByDate(@Req() request, @Param('date') date: string) {
		return this.emotionsService.findByDate(date, request.user);
	}

	@Post('/')
	@UseGuards(JwtAuthGuard)
	create(@Req() request, @Body() createEmotionDto: CreateEmotionDto) {
		return this.emotionsService.create(createEmotionDto, request.user);
	}

	@Patch('/')
	@UseGuards(JwtAuthGuard)
	update(
		@Req() request,
		@Body() updateEmotionDto: UpdateEmotionDto,
		@Param('id') id: number,
	) {
		return this.emotionsService.update(id, updateEmotionDto, request.user);
	}

	@Delete('/date')
	@UseGuards(JwtAuthGuard)
	delete(@Req() request, @Param('id') id: number) {
		return this.emotionsService.delete(id, request.user);
	}
}
