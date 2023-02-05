import {
  DeleteItemOutput,
  GetItemOutput,
  ItemList,
} from 'aws-sdk/clients/dynamodb';
import { Category } from '../models/Category.model';
import { MessageResponse } from './common.dto';

export class CreateCategoryResponseDto extends MessageResponse {
  data: Category;
}

export class GetAllCategoriesResponseDto extends MessageResponse {
  data: ItemList | Category[];
  count: number;
  scannedCount: number;
}

export class GetCategoryResponseDto extends MessageResponse {
  data: GetItemOutput | Category;
  count?: number;
  scannedCount?: number;
}

export class UpdateCategoryResponseDto extends MessageResponse {
  data: GetItemOutput | Category[];
  count?: number;
  scannedCount?: number;
}

export class DeleteCategoryResponseDto extends MessageResponse {
  data: DeleteItemOutput | Category[];
  count?: number;
  scannedCount?: number;
}
