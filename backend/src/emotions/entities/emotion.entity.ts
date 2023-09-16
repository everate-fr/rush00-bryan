import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Entry } from 'src/entries/entities/entry.entity';
import { EEmotion } from '../enums/emotions.enum';
import { EReason } from '../enums/reason.enum';

@Entity()
export class Emotion {
	@PrimaryGeneratedColumn()
	id: number;

	// One entry can have many emotions
	@ManyToOne(() => Entry, (entry) => entry.emotions)
	entry: Entry;

	@Column()
	emotion: EEmotion;

	@Column()
	reason: EReason;

	@Column({ nullable: true })
	journal: string;
}
