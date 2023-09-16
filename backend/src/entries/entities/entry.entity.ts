import {
	Column,
	Entity,
	JoinTable,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';

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
}
