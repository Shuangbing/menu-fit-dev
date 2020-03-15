import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, FetchCategoryDto } from './categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) { }

  @Get()
  async fetchAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async fetchOne(@Param() { id }: FetchCategoryDto) {
    const categoires = await this.categoriesService.findOne(id);
    if (!categoires) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `カテゴリーが見つかりませんでした(ID: ${id})`,
        },
        404,
      );
    }
    return categoires;
  }

  @Delete(':id')
  async removeOne(@Param() { id }: FetchCategoryDto) {
    const { affected } = await this.categoriesService.remove(id);
    if (!affected) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `削除できませんでした(ID: ${id})`,
        },
        404,
      );
    }
    return;
  }

  @Post()
  async createOne(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }
}
