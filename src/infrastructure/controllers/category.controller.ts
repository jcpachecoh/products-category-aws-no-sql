import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from '../services/category.service';
import { CreateCategoryDto } from '../../domain/dto/create-category.dto';
import { UpdateCategoryDto } from '../../domain/dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async findAllCategories() {
    return await this.categoriesService.findAllCategories();
  }

  @Get(':id')
  async findOneCategory(@Param('id') id: string) {
    return await this.categoriesService.findOneCategory(id);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    return await this.categoriesService.removeCategory(id);
  }
}
