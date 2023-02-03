import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { CreateProductDto } from '../../domain/dto/create-product.dto';
import { UpdateProductDto } from '../../domain/dto/update-product.dto';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ProductRepository } from '../../domain/repositories/products.repository';
import {
  CreateProductResponseDto,
  DeleteProductResponseDto,
  GetAllProductsResponseDto,
  GetProductResponseDto,
  UpdateProductResponseDto,
} from '../../domain/dto';
import { Product } from '../../domain/models';
import { isEmpty } from 'lodash';
import { HttpResponse } from '../../domain/models/Response.model';

@Injectable()
export class ProductsService implements ProductRepository {
  TABLE_NAME = 'ProductsTable';

  constructor(private dbService: DatabaseService) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<CreateProductResponseDto | HttpResponse> {
    if (isEmpty(createProductDto.name)) {
      throw new HttpException('Name can not be null', HttpStatus.BAD_REQUEST);
    }
    const productObj: Product = {
      id: uuid(),
      createdDate: new Date().toISOString().toString(),
      ...createProductDto,
    };

    try {
      await this.dbService
        .connect()
        .put({
          TableName: this.TABLE_NAME,
          Item: productObj,
        })
        .promise();

      return {
        status: HttpStatus.CREATED,
        message: `successfully record saved`,
        data: productObj,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findAllProducts(): Promise<GetAllProductsResponseDto> {
    try {
      const response: AWS.DynamoDB.DocumentClient.ScanOutput | AWS.AWSError =
        await this.dbService
          .connect()
          .scan({
            TableName: this.TABLE_NAME,
          })
          .promise();
      const products = response?.Items;
      const count: number = response?.Count;
      const scannedCount: number = response.ScannedCount;
      return {
        status: HttpStatus.OK,
        data: products,
        count,
        scannedCount,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOneProduct(id: string): Promise<GetProductResponseDto> {
    try {
      const response = await this.dbService
        .connect()
        .get({
          TableName: this.TABLE_NAME,
          Key: { id },
        })
        .promise();
      const product = response?.Item;

      return {
        status: HttpStatus.OK,
        message: 'Retrieved successfully!',
        data: product,
        count: 1,
        scannedCount: 1,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateProductResponseDto> {
    try {
      return {
        status: HttpStatus.OK,
        message: 'Updated!',
        data: await this.dbService
          .connect()
          .update({
            TableName: this.TABLE_NAME,
            Key: { id },
            UpdateExpression:
              'set #variable1 = :x, #variable2 = :y, #variable3 = :z, #variable4 = :w',
            ExpressionAttributeNames: {
              '#variable1': 'name',
              '#variable2': 'description',
              '#variable3': 'images',
              '#variable4': 'price',
            },
            ExpressionAttributeValues: {
              ':x': updateProductDto.name,
              ':y': updateProductDto.description,
              ':z': updateProductDto.images,
              ':w': updateProductDto.price,
            },
          })
          .promise(),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async removeProduct(id: string): Promise<DeleteProductResponseDto> {
    try {
      return {
        status: HttpStatus.OK,
        message: 'Deleted!',
        data: await this.dbService
          .connect()
          .delete({
            TableName: this.TABLE_NAME,
            Key: { id },
          })
          .promise(),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
