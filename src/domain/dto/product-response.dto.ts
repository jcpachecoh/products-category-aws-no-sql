import { HttpStatus } from '@nestjs/common';

import {
  DeleteItemOutput,
  GetItemOutput,
  ItemList,
} from 'aws-sdk/clients/dynamodb';
import { Product } from '../models/Product.model';
import { MessageResponse } from './common.dto';

export class CreateProductResponseDto extends MessageResponse {
  data: Product;
}

export class GetAllProductsResponseDto extends MessageResponse {
  data: ItemList | Product[];
  count: number;
  scannedCount: number;
}

export class GetProductResponseDto extends MessageResponse {
  data: GetItemOutput | Product[];
  count?: number;
  scannedCount?: number;
}

export class UpdateProductResponseDto extends MessageResponse {
  data: GetItemOutput | Product[];
  count?: number;
  scannedCount?: number;
}

export class DeleteProductResponseDto extends MessageResponse {
  data: DeleteItemOutput | Product[];
  count?: number;
  scannedCount?: number;
}
