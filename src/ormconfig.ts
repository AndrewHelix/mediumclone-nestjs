import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { CreateTags1677590778395 } from './migrations/1677590778395-CreateTags';
import { TagEntity } from './tag/tag.entity';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mediumclone',
  password: '1234',
  database: 'mediumclone',
  entities: [TagEntity],
  synchronize: false,
  migrations: [CreateTags1677590778395],
};

export default config;
