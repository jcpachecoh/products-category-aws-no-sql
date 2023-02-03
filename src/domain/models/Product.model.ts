import { Category } from './Category.model';

export class Product {
  id: string;
  name: string;
  description?: string;
  images: string[];
  category: Category;
  price: number;
  createdDate?: string;
  updatedDate?: string;
}
