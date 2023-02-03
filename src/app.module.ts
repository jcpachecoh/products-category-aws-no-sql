import { Module } from '@nestjs/common';
import { CategoriesModule } from './infrastructure/modules/categories.module';

import { ProductsModule } from './infrastructure/modules/product.module';

@Module({
  imports: [ProductsModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
