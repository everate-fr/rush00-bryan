import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [TypeOrmModule.forFeature([User]), AuthModule],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
