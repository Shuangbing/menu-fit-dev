import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantdtoDto } from './restaurants.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) { }

  async findAll() {
    return await this.restaurantsRepository.find();
  }

  async findOne(id: number) {
    return await this.restaurantsRepository.findOne(id);
  }

  async remove(id: number) {
    return await this.restaurantsRepository.delete(id);
  }

  async create(createRestaurantdtoDto: CreateRestaurantdtoDto) {
    console.log(createRestaurantdtoDto)
    return await this.restaurantsRepository.save(createRestaurantdtoDto);
  }
}
