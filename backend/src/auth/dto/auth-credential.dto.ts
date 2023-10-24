import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { IS_A_STRING, MAX_LENGTH, MIN_LENGTH, PASSWOR_TOO_WEAK } from '../consts/validation.consts';

export class AuthCredentialsDto {
  @IsString({ message: IS_A_STRING })
  @MinLength(4, { message: MIN_LENGTH })
  @MaxLength(20, { message: MAX_LENGTH })
  username: string;

  @IsString({ message: IS_A_STRING })
  @MinLength(8, { message: MIN_LENGTH })
  @MaxLength(20, { message: MAX_LENGTH })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: PASSWOR_TOO_WEAK })
  password: string;
}
