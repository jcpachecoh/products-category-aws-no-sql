import { Module } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { DbModule } from '../db/db.module';

import { CategoriesController } from '../controllers/category.controller';
import { CategoriesService } from '../services/category.service';

@Module({
  imports: [DbModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, DatabaseService],
})
export class CategoriesModule {}
