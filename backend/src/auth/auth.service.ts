import { Injectable } from '@nestjs/common';
import { UserRepository } from './model/user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    this.userRepository.signUp(authCredentialsDto);
  }
}
