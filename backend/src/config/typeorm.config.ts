import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ServerConfigType } from 'config/server.config';

export const TypeOrmFactory = async (
  configService: ConfigService<ServerConfigType, true>,
): Promise<TypeOrmModuleOptions> => {
  const database = configService.get('database', { infer: true });
  return {
    type: database.type as 'postgres',
    host: database.host,
    port: database.port,
    username: database.username,
    password: database.password,
    database: database.database,
    autoLoadEntities: true,
    synchronize: database.synchronize,
  };
};
