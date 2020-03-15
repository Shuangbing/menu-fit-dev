import { Controller, Get, Body, Post } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantdtoDto } from './restaurants.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) { }

  @Get()
  async fetchAll() {
    return await this.restaurantsService.findAll();
  }

  @Post()
  async createOne(@Body() createRestaurantdtoDto: CreateRestaurantdtoDto) {
    return await this.restaurantsService.create(createRestaurantdtoDto);
  }

}
