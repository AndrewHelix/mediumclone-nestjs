import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDB1677590778395 implements MigrationInterface {
  name = 'SeedDBCreateTags1677590778395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );

    //password is 123
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInVzZXJuYW1lIjoibG9oMiIsImVtYWlsIjoiZW1haWwzQGV4YW1wbGUuY29tIiwiaWF0IjoxNjc3NzUzODM3fQ.HjX2Lx5enrhWn2u1UKVAfvhM7n1bbPpI44vcNFUgitM')`,
    );

    //двойные ковычки в tagList и authorId потому что postgres без этого camelCase прочитает не правильно
    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'first article desc', 'first article body', 'coffee,dragons', 1)`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second article', 'second article desc', 'second article body', 'coffee,dragons', 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tags"`);
  }
}
