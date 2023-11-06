const serverConfig = () => ({
  port: parseInt(process.env.PORT ?? '8000'),
  database: {
    type: process.env.DATABASE_TYPE ?? 'postgres',
    port: parseInt(process.env.DATABASE_PORT ?? '5432'),
    database: process.env.DATABASE_DATABASE ?? 'taskmanagment',
    host: process.env.DATABASE_HOST ?? '127.0.0.1',
    username: process.env.DATABASE_USERNAME ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? '123',
    synchronize: Boolean(process.env.DATABASE_SYNCRONIZE ?? true),
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? '',
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN ?? '3600'),
  },
});

export default serverConfig;

export type ServerConfigType = ReturnType<typeof serverConfig>;
