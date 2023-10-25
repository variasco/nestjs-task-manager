import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { USER_ALREADY_EXIST } from '../consts/validation.consts';
import { AuthCredentialsDto } from '../dto/auth-credential.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.create({
      username,
      password,
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
}
