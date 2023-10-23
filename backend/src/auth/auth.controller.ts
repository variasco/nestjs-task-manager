import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    this.authService.signUp(authCredentialsDto);
  }
}
