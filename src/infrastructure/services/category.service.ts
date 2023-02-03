import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { CreateCategoryDto } from '../../domain/dto/create-category.dto';
import { UpdateCategoryDto } from '../../domain/dto/update-category.dto';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import {
  CreateCategoryResponseDto,
  DeleteCategoryResponseDto,
  GetAllCategoriesResponseDto,
  GetCategoryResponseDto,
  UpdateCategoryResponseDto,
} from '../../domain/dto';
import { Category } from '../../domain/models';
import { isEmpty } from 'lodash';
import { HttpResponse } from '../../domain/models/Response.model';

@Injectable()
export class CategoriesService implements CategoryRepository {
  TABLE_NAME = 'CategoriesTable';

  constructor(private dbService: DatabaseService) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CreateCategoryResponseDto | HttpResponse> {
    if (isEmpty(createCategoryDto.name)) {
      throw new HttpException('Name can not be null', HttpStatus.BAD_REQUEST);
    }
    const productObj: Category = {
      id: uuid(),
      createdDate: new Date().toISOString(),
      ...createCategoryDto,
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

  async findAllCategories(): Promise<GetAllCategoriesResponseDto> {
    try {
      const response: AWS.DynamoDB.DocumentClient.ScanOutput | AWS.AWSError =
        await this.dbService
          .connect()
          .scan({
            TableName: this.TABLE_NAME,
          })
          .promise();
      const categories = response?.Items;
      const count: number = response?.Count;
      const scannedCount: number = response.ScannedCount;
      return {
        status: HttpStatus.OK,
        data: categories,
        count,
        scannedCount,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOneCategory(id: string): Promise<GetCategoryResponseDto> {
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

  async updateCategory(
    id: string,
    updateCategoryto: UpdateCategoryDto,
  ): Promise<UpdateCategoryResponseDto> {
    try {
      return {
        status: HttpStatus.OK,
        message: 'Updated!',
        data: await this.dbService
          .connect()
          .update({
            TableName: this.TABLE_NAME,
            Key: { id },
            UpdateExpression: 'set #variable1 = :x, #variable2 = :y',
            ExpressionAttributeNames: {
              '#variable1': 'name',
              '#variable2': 'description',
            },
            ExpressionAttributeValues: {
              ':x': updateCategoryto.name,
              ':y': updateCategoryto.description,
            },
          })
          .promise(),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async removeCategory(id: string): Promise<DeleteCategoryResponseDto> {
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
