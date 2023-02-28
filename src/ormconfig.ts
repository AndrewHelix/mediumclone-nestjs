import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { CreateTags1677590778395 } from './migrations/1677590778395-CreateTags';
import { AddUsernameToUsers1677598709829 } from './migrations/1677598709829-AddUsernameToUsers';
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
  migrations: [CreateTags1677590778395, AddUsernameToUsers1677598709829],
};

export default config;
