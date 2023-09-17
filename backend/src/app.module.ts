import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { EntriesModule } from './entries/entries.module';
import { Entry } from './entries/entities/entry.entity';
import { EmotionsModule } from './emotions/emotions.module';
import { Emotion } from './emotions/entities/emotion.entity';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DB_HOST'),
				port: configService.get('DB_PORT'),
				username: configService.get('DB_USER'),
				password: configService.get('DB_PASS'),
				database: configService.get('DB_NAME'),
				entities: [User, Entry, Emotion],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
		UsersModule,
		AuthModule,
		EntriesModule,
		EmotionsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
