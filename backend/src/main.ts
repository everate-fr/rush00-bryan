import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const fastifyAdapter = new FastifyAdapter();
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		fastifyAdapter,
	);
	const config = app.get<ConfigService>(ConfigService);

	app.useGlobalPipes(
		new ValidationPipe({ whitelist: true, transform: true }),
	);
	await app.listen(config.get<number>('PORT') || 3000, '::');
}
bootstrap();
