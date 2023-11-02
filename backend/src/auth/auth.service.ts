import { Injectable, UnauthorizedException } from '@nestjs/common';
import { INVALID_CREDENTIALS } from './consts/validation.consts';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './model/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const username = await this.userRepository.signIn(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }
  }
}
