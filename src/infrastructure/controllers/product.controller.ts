import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from '../services/product.service';
import { CreateProductDto } from '../../domain/dto/create-product.dto';
import { UpdateProductDto } from '../../domain/dto/update-product.dto';
import { ProductPresenter } from './product.presenter';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiExtraModels(ProductPresenter)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.createProduct(createProductDto);
  }

  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiExtraModels(ProductPresenter)
  @Get()
  async findAllProdutcs() {
    return await this.productsService.findAllProducts();
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string) {
    return await this.productsService.findOneProduct(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    return await this.productsService.removeProduct(id);
  }
}
