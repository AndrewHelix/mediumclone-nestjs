import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { CreateTags1677590778395 } from './migrations/1677590778395-CreateTags';
import { CreateUsers1677595244626 } from './migrations/1677595244626-CreateUsers';
import { TagEntity } from './tag/tag.entity';
import { UserEntity } from './user/user.entity';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mediumclone',
  password: '1234',
  database: 'mediumclone',
  entities: [TagEntity, UserEntity],
  synchronize: false,
  migrations: [CreateTags1677590778395, CreateUsers1677595244626],
};

export default config;
