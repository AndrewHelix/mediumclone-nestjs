import { UserEntity } from '@app/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, getRepository, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponse } from './types/articleResponse.interface';
import slugify from 'slugify';
import { ArticlesResponse } from './types/articlesResponse.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  async findAll(userId: number, query: any): Promise<ArticlesResponse> {
    const queryBuilder = this.dataSource
      .getRepository(ArticleEntity)
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.author', 'author');

    queryBuilder.orderBy('articles.createdAt', 'DESC');

    const articlesCount = await queryBuilder.getCount();

    if (query.tag) {
      queryBuilder.andWhere('articles.tagList LIKE :tag', {
        tag: `%${query.tag}%`,
      });
    }

    if (query.author) {
      const author = await this.userRepository.findOne({
        where: { username: query.author },
      });
      queryBuilder.andWhere('articles.authorId = :id', {
        id: author.id,
      });
    }
    if (query.limit) {
      queryBuilder.limit(query.limit);
    }
    if (query.offset) {
      queryBuilder.offset(query.offset);
    }
    const articles = await queryBuilder.getMany();

    return { articles, articlesCount };
  }

  async createArticle(
    currentUser: UserEntity,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);

    if (!article.tagList) {
      article.tagList = [];
    }

    article.slug = this.getSlug(createArticleDto.title);
    article.author = currentUser;

    return await this.articleRepository.save(article);
  }

  async findBySlug(slug: string): Promise<ArticleEntity> {
    return await this.articleRepository.findOne({ where: { slug } });
  }

  async deleteArticle(userId: number, slug: string): Promise<DeleteResult> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException("Article didn't find", HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== userId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    return await this.articleRepository.delete({ slug });
  }

  async updateArticle(
    slug: string,
    updateArticleDto: CreateArticleDto,
    userId: number,
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException("Article didn't find", HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== userId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    Object.assign(article, updateArticleDto);
    return await this.articleRepository.save(article);
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponse {
    return { article };
  }

  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
