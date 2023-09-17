import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEmotionDto } from './dto/create-emotion.dto';
import { EntriesService } from 'src/entries/entries.service';
import { User } from 'src/users/entities/user.entity';
import { Emotion } from './entities/emotion.entity';
import { UpdateEmotionDto } from './dto/update-emotion.dto';

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

	async findAll(user: User) {
		return this.emotionsRepository.find({
			where: { entry: { user: { id: user.id } } },
			order: { entry: { date: 'DESC' } },
		});
	}

	async findByDate(date: string, user: User) {
		return this.emotionsRepository.find({
			where: { entry: { user: { id: user.id }, date: date } },
		});
	}

	async update(id: number, updateEmotionDto: UpdateEmotionDto, user: User) {
		const emotion = await this.emotionsRepository.findOne({
			where: { id: id, entry: { user: { id: user.id } } },
		});
		if (!emotion) throw new BadRequestException('Emotion not found');

		emotion.emotion = updateEmotionDto.emotion;
		emotion.reason = updateEmotionDto.reason;
		emotion.journal = updateEmotionDto.journal;

		return this.emotionsRepository.save(emotion);
	}

	async delete(id: number, user: User) {
		const emotion = await this.emotionsRepository.findOne({
			where: { id: id, entry: { user: { id: user.id } } },
		});
		if (!emotion) throw new BadRequestException('Emotion not found');

		return this.emotionsRepository.delete(emotion);
	}
}
