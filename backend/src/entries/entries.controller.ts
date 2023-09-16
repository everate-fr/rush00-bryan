import {
	Controller,
	Post,
	Body,
	UseGuards,
	Req,
	Get,
	Param,
	Patch,
	Delete,
} from '@nestjs/common';

import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('/api/v1/entries')
export class EntriesController {
	constructor(private readonly entriesService: EntriesService) {}

	@Get('/')
	@UseGuards(JwtAuthGuard)
	findAll(@Req() request) {
		return this.entriesService.findAll(request.user);
	}

	@Get('/:date')
	@UseGuards(JwtAuthGuard)
	findByDate(@Req() request, @Param('date') date: string) {
		return this.entriesService.findByDate(date, request.user);
	}

	@Post('/')
	@UseGuards(JwtAuthGuard)
	create(@Req() request, @Body() createEntryDto: CreateEntryDto) {
		return this.entriesService.create(createEntryDto, request.user);
	}

	@Patch('/:date')
	@UseGuards(JwtAuthGuard)
	update(
		@Req() request,
		@Body() updateEntryDto: CreateEntryDto,
		@Param('date') date: string,
	) {
		return this.entriesService.update(date, updateEntryDto, request.user);
	}

	@Delete('/:date')
	@UseGuards(JwtAuthGuard)
	delete(@Req() request, @Param('date') date: string) {
		return this.entriesService.delete(date, request.user);
	}
}
