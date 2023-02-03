import {
  CreateCategoryDto,
  CreateCategoryResponseDto,
  DeleteCategoryResponseDto,
  GetAllCategoriesResponseDto,
  GetCategoryResponseDto,
  UpdateCategoryDto,
  UpdateCategoryResponseDto,
} from '../dto';
import { HttpResponse } from '../models/Response.model';

export interface CategoryRepository {
  createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CreateCategoryResponseDto | HttpResponse>;
  findAllCategories(): Promise<GetAllCategoriesResponseDto>;
  findOneCategory(id: string): Promise<GetCategoryResponseDto>;
  updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateCategoryResponseDto>;
  removeCategory(id: string): Promise<DeleteCategoryResponseDto>;
}
