import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';

import { Entry } from './entities/entry.entity';
import { CreateEntryDto } from './dto/create-entry.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Injectable()
export class EntriesService {
	constructor(
		@InjectRepository(Entry)
		private readonly entriesRepository: Repository<Entry>,
	) {}

	async create(createEntryDto: CreateEntryDto, user: User) {
		// Check date format
		const date = DateTime.fromFormat(createEntryDto.date, 'yyyy-MM-dd');
		if (!date.isValid)
			throw new BadRequestException(date.invalidExplanation);
		if (date.startOf('day') > DateTime.now().startOf('day'))
			throw new BadRequestException('Date cannot be in the future');

		// Check if there is a journal entry for the date
		const existing = await this.entriesRepository.findOne({
			where: { date: createEntryDto.date },
		});
		if (existing) {
			return new BadRequestException(
				'Journal entry already exists for this date',
			);
		}

		// Create a new journal entry
		const entry = new Entry();
		entry.date = createEntryDto.date;
		entry.journal = createEntryDto.journal;
		entry.user = user;

		return this.entriesRepository.save(entry);
	}

	async findAll(user: User) {
		return this.entriesRepository.find({
			where: { user: { id: user.id } },
			order: { date: 'DESC' },
		});
	}

	async findByDate(date: string, user: User) {
		const entry = await this.entriesRepository.findOne({
			where: { date: date, user: { id: user.id } },
		});
		if (!entry)
			throw new NotFoundException('Entry not found for this date');
		return entry;
	}

	async update(date: string, updateEntryDto: UpdateEntryDto, user: User) {
		const entry = await this.entriesRepository.findOne({
			where: { date: date, user: { id: user.id } },
		});
		if (!entry)
			throw new NotFoundException('Entry not found for this date');

		entry.journal = updateEntryDto.journal;

		return this.entriesRepository.save(entry);
	}

	async delete(date: string, user: User) {
		const entry = await this.entriesRepository.findOne({
			where: { date: date, user: { id: user.id } },
		});
		if (!entry)
			throw new NotFoundException('Entry not found for this date');

		return this.entriesRepository.remove(entry);
	}
}
