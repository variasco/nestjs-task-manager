import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ServerConfigType } from 'config/server.config';

async function JwtConfigFactory(
  configService: ConfigService<ServerConfigType, true>,
): Promise<JwtModuleOptions> {
  const { secret, expiresIn } = configService.get('jwt', { infer: true });
  return {
    secret,
    signOptions: { expiresIn },
  };
}

export default JwtConfigFactory;
