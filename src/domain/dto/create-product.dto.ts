import { Category } from '../models/Category.model';

export class CreateProductDto {
  name: string;
  description?: string = '';
  images: string[];
  category: Category;
  price: number;
  createdDate?: string = new Date().toISOString();
}
