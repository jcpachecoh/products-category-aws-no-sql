export class CreateProductDto {
  name: string;
  description?: string = '';
  images: string[];
  category: string;
  price: number;
  createdDate?: string = new Date().toISOString();
  updatedDate?: string;
}
