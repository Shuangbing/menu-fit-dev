import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './categories.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) { }

  async findAll() {
    return await this.categoriesRepository.find();
  }

  async findOne(id: number) {
    return await this.categoriesRepository.findOne(id);
  }

  async remove(id: number) {
    return await this.categoriesRepository.delete(id);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesRepository.save(createCategoryDto);
  }
}
