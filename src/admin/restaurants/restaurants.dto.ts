import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, IsInt } from "class-validator"
import { Category } from "../categories/categories.entity";

export class CreateRestaurantdtoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  categories: Category[];
}

export class FetchRestaurantDto {
  @IsNumber()
  @IsNotEmpty()
  id: number
}