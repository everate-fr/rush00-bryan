import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private configService: ConfigService) {
		// const JWT_SECRET = configService.get<string>('JWT_SECRET');

		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				JwtStrategy.extractJWT,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	private static extractJWT(req: any) {
		if (
			req.headers &&
			'x-api-key' in req.headers &&
			req.headers['x-api-key'].length > 0
		) {
			// Remove the Bearer prefix and return the token
			if (req.headers['x-api-key'].startsWith('Bearer '))
				return req.headers['x-api-key'].split(' ')[1];
			return req.headers['x-api-key'];
		}
		return null;
	}

	async validate(payload: any) {
		if (!payload || !payload.id) return null;
		return {
			...payload,
		};
	}
}
