import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../model/user.entity';
import { UserRepository } from '../model/user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { ServerConfigType } from 'config/server.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService<ServerConfigType, true>,
  ) {
    const { secret } = configService.get('jwt', { infer: true });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOneBy({ username: payload.username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
