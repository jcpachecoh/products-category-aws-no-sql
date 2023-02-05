export class CreateCategoryDto {
  name: string;
  description?: string = '';
  image: string;
  createdDate: string;
  updatedDate?: string;
}
