import { IsString, IsNotEmpty, IsNumber } from "class-validator"

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string
}

export class FetchCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  id: number
}