import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';

import {
  CreateCategoryDto,
  CreateCategoryResponseDto,
  GetAllCategoriesResponseDto,
  GetCategoryResponseDto,
  UpdateCategoryResponseDto,
} from '../domain/dto';
import { DatabaseService } from '../infrastructure/db/db.service';
import { HttpResponse } from '../domain/models/Response.model';
import { CategoriesService } from '../../src/infrastructure/services/category.service';
import { CategoriesController } from '../../src/infrastructure/controllers/category.controller';

describe('Categorys Controller', () => {
  let categoriesController: CategoriesController;
  let databaseService: DatabaseService;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService, DatabaseService],
    }).compile();

    categoriesController = app.get<CategoriesController>(CategoriesController);
    databaseService = new DatabaseService();
    categoriesService = new CategoriesService(databaseService);
    categoriesController = new CategoriesController(categoriesService);
  });

  describe('given  the user want to use Categorys Service', () => {
    const category: CreateCategoryDto = {
      name: 'test',
      description: 'test detailsaaaa',
      image: 'image1',
      createdDate: '',
    };

    it('then should get an exception when user wants to create a category with empty name ', async () => {
      const emptyCategory = { ...category, name: '' };
      const result: HttpResponse = {
        status: HttpStatus.CREATED,
        message: 'Name can not be null',
      };

      jest
        .spyOn(categoriesService, 'createCategory')
        .mockImplementationOnce(() => Promise.resolve(result));

      expect(await categoriesController.createCategory(emptyCategory)).toBe(
        result,
      );
    });
    it('then should get a success messages when user wants to create a category', async () => {
      const result: CreateCategoryResponseDto = {
        status: HttpStatus.CREATED,
        message: 'was created',
        data: {
          id: 'someId',
          ...category,
        },
      };

      jest
        .spyOn(categoriesService, 'createCategory')
        .mockImplementationOnce(() => Promise.resolve(result));
      expect(await categoriesController.createCategory(category)).toBe(result);
    });
    it('then user should get a success message and all categories when performing get all categories', async () => {
      const result: GetAllCategoriesResponseDto = {
        status: HttpStatus.OK,
        data: [
          {
            name: 'new category',
            description: 'test detailsaaaa',
            image: 'image',
            id: '84bae457-616a-4562-8d8a-7829984608d7',
          },
        ],
        count: 1,
        scannedCount: 1,
      };

      jest
        .spyOn(categoriesService, 'findAllCategories')
        .mockImplementationOnce(() => Promise.resolve(result));
      expect(await categoriesController.findAllCategories()).toBe(result);
    });
    it('then user should get a success message and all categories when performing get category id', async () => {
      const result: GetCategoryResponseDto = {
        status: HttpStatus.OK,
        data: {
          name: 'new category',
          description: 'test detailsaaaa',
          image: 'image',
          id: '84bae457-616a-4562-8d8a-7829984608d7',
        },
        count: 1,
        scannedCount: 1,
      };

      jest
        .spyOn(categoriesService, 'findOneCategory')
        .mockImplementationOnce(() => Promise.resolve(result));
      expect(
        await categoriesController.findOneCategory(
          '84bae457-616a-4562-8d8a-7829984608d7',
        ),
      ).toBe(result);
    });

    it('then user should get a success message and messages when performing update category', async () => {
      const result: UpdateCategoryResponseDto = {
        status: HttpStatus.OK,
        data: {},
        message: 'udpated',
      };

      jest
        .spyOn(categoriesService, 'updateCategory')
        .mockImplementationOnce(() => Promise.resolve(result));
      expect(
        await categoriesController.updateCategory(
          '84bae457-616a-4562-8d8a-7829984608d7',
          {
            image: '',
            description: 'variable2',
            name: 'new aaaa',
            updatedDate: 'some date',
          },
        ),
      ).toBe(result);
    });
    it('then user should get a success message and messages when performing remove category', async () => {
      const result: UpdateCategoryResponseDto = {
        status: HttpStatus.OK,
        data: {},
        message: 'Deleted',
      };

      jest
        .spyOn(categoriesService, 'removeCategory')
        .mockImplementationOnce(() => Promise.resolve(result));
      expect(
        await categoriesController.removeCategory(
          '84bae457-616a-4562-8d8a-7829984608d7',
        ),
      ).toBe(result);
    });
  });
});
