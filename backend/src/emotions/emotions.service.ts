import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEmotionDto } from './dto/create-emotion.dto';
import { EntriesService } from 'src/entries/entries.service';
import { User } from 'src/users/entities/user.entity';
import { Emotion } from './entities/emotion.entity';

@Injectable()
export class EmotionsService {
	constructor(
		@InjectRepository(Emotion)
		private readonly emotionsRepository: Repository<Emotion>,

		private readonly entriesService: EntriesService,
	) {}

	async create(createEmotionDto: CreateEmotionDto, user: User) {
		// Try to find an entry for the date
		const entry = await this.entriesService.findByDate(
			createEmotionDto.date,
			user,
		);
		if (!entry) {
			return new BadRequestException('No entry found for this date');
		}

		const emotion = new Emotion();
		emotion.entry = entry;
		emotion.emotion = createEmotionDto.emotion;
		emotion.reason = createEmotionDto.reason;
		emotion.journal = createEmotionDto.journal;

		return this.emotionsRepository.save(emotion);
	}
}
