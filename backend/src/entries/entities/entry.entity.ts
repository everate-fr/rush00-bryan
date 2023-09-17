import {
	Column,
	Entity,
	JoinTable,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Emotion } from 'src/emotions/entities/emotion.entity';

@Entity()
export class Entry {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user) => user.id, { eager: true })
	@JoinTable()
	user: User;

	// date as 'YYYY-MM-DD'
	@Column()
	date: string;

	@Column()
	journal: string;

	// One entry can have many emotions
	@OneToMany(() => Emotion, (emotion) => emotion.entry, { eager: true })
	emotions: Emotion[];
}
