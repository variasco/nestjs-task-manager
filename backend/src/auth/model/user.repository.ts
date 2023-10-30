import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { USER_ALREADY_EXIST } from '../consts/validation.consts';
import { AuthCredentialsDto } from '../dto/auth-credential.dto';
import { User } from './user.entity';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await genSalt();
    const hashedPassword = await this.hashPassword(password, salt);

    const user = this.create({
      salt,
      username,
      password: hashedPassword,
    });

    try {
      await user.save();
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(USER_ALREADY_EXIST);
      }

      throw new InternalServerErrorException('Server error');
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }
}
