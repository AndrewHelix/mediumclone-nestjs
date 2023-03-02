import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ArticleEntity } from './article/article.entity';
import { CreateTags1677590778395 } from './migrations/1677590778395-CreateTags';
import { AddUsernameToUsers1677598709829 } from './migrations/1677598709829-AddUsernameToUsers';
import { CreateArticles1677678750950 } from './migrations/1677678750950-CreateArticles';
import { AddRelationsBetweenArticleAndUser1677680534396 } from './migrations/1677680534396-AddRelationsBetweenArticleAndUser';
import { AddFavoriteRelationsBetweenArticleAndUser1677740329740 } from './migrations/1677740329740-AddFavoriteRelationsBetweenArticleAndUser';
import { CreateFollows1677759442046 } from './migrations/1677759442046-CreateFollows';
import { FollowEntity } from './profile/follow.entity';
import { TagEntity } from './tag/tag.entity';
import { UserEntity } from './user/user.entity';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mediumclone',
  password: '1234',
  database: 'mediumclone',
  entities: [TagEntity, UserEntity, ArticleEntity, FollowEntity],
  synchronize: false,
  migrations: [
    CreateTags1677590778395,
    AddUsernameToUsers1677598709829,
    CreateArticles1677678750950,
    AddRelationsBetweenArticleAndUser1677680534396,
    AddFavoriteRelationsBetweenArticleAndUser1677740329740,
    CreateFollows1677759442046,
  ],
};

export default config;
