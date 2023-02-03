import { Module } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { DbModule } from '../db/db.module';

import { ProductsController } from '../controllers/product.controller';
import { ProductsService } from '../services/product.service';

@Module({
  imports: [DbModule],
  controllers: [ProductsController],
  providers: [ProductsService, DatabaseService],
})
export class ProductsModule {}
