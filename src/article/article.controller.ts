import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponse } from './types/articleResponse.interface';
import { ArticlesResponse } from './types/articlesResponse.interface';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(
    @User('id') userId: number,
    @Query() query: any,
  ): Promise<ArticlesResponse> {
    return await this.articleService.findAll(userId, query);
  }

  @Get('feed')
  @UseGuards(AuthGuard)
  async getFeed(
    @User('id') userId: number,
    @Query() query: any,
  ): Promise<ArticlesResponse> {
    return await this.articleService.getFeed(userId, query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponse> {
    const article = await this.articleService.createArticle(
      currentUser,
      createArticleDto,
    );

    return this.articleService.buildArticleResponse(article);
  }

  @Get(':slug')
  async getSingleArticle(
    @Param('slug') slug: string,
  ): Promise<ArticleResponse> {
    const article = await this.articleService.findBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(@User('id') userId: number, @Param('slug') slug: string) {
    return await this.articleService.deleteArticle(userId, slug);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateArticle(
    @User('id') userId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: CreateArticleDto,
  ): Promise<ArticleResponse> {
    const article = await this.articleService.updateArticle(
      slug,
      updateArticleDto,
      userId,
    );

    return this.articleService.buildArticleResponse(article);
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async addArticleToFavorites(
    @User('id') userId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponse> {
    const article = await this.articleService.addArticleToFavorites(
      userId,
      slug,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async deleteArticleFromFavorites(
    @User('id') userId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponse> {
    const article = await this.articleService.deleteArticleFromFavorites(
      userId,
      slug,
    );
    return this.articleService.buildArticleResponse(article);
  }
}
