import { ApiProperty } from '@nestjs/swagger';
import { Product, Category } from '../../domain/models';

export class ProductPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  images: string[];
  @ApiProperty()
  category: Category;
  @ApiProperty()
  createdDate?: string;
  @ApiProperty()
  updatedDate?: string;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.category = product.category;
    this.createdDate = product.createdDate;
    this.updatedDate = product.updatedDate;
  }
}
