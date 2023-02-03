import {
  CreateProductDto,
  CreateProductResponseDto,
  DeleteProductResponseDto,
  GetAllProductsResponseDto,
  GetProductResponseDto,
  UpdateProductDto,
  UpdateProductResponseDto,
} from '../dto';
import { HttpResponse } from '../models/Response.model';

export interface ProductRepository {
  createProduct(
    createProductDto: CreateProductDto,
  ): Promise<CreateProductResponseDto | HttpResponse>;
  findAllProducts(): Promise<GetAllProductsResponseDto>;
  findOneProduct(id: string): Promise<GetProductResponseDto>;
  updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateProductResponseDto>;
  removeProduct(id: string): Promise<DeleteProductResponseDto>;
}
