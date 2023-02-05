import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { ProductsController } from '../infrastructure/controllers/product.controller';

import { ProductsService } from '../infrastructure/services/product.service';

import {
  CreateProductDto,
  CreateProductResponseDto,
  GetAllProductsResponseDto,
  GetProductResponseDto,
  UpdateProductResponseDto,
} from '../domain/dto';
import { DatabaseService } from '../infrastructure/db/db.service';
import { HttpResponse } from '../domain/models/Response.model';
import { CategoriesService } from '../../src/infrastructure/services/category.service';

describe('Products Controller', () => {
  let productsController: ProductsController;
  let databaseService: DatabaseService;
  let productsService: ProductsService;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, DatabaseService, CategoriesService],
    }).compile();

    productsController = app.get<ProductsController>(ProductsController);
    databaseService = new DatabaseService();
    productsService = new ProductsService(databaseService, categoriesService);
    productsController = new ProductsController(productsService);
  });

  describe('given  the user want to use Products Service', () => {
    const product: CreateProductDto = {
      name: 'test',
      description: 'test detailsaaaa',
      images: ['image1', 'image2'],
      price: 22,
      category: 'ea5e2360-39c8-4f7a-b2e1-3d7108bcba41',
    };

    it('then should get an exception when user wants to create a product with empty name ', async () => {
      const emptyProduct = { ...product, name: '' };
      const result: HttpResponse = {
        status: HttpStatus.CREATED,
        message: 'Name can not be null',
      };

      jest
        .spyOn(productsService, 'createProduct')
        .mockImplementationOnce(() => Promise.resolve(result));

      expect(await productsController.createProduct(emptyProduct)).toBe(result);
    });
    it('then should get a success messages when user wants to create a product', async () => {
      const result: CreateProductResponseDto = {
        status: HttpStatus.CREATED,
        message: 'was created',
        data: {
          id: 'someId',
          ...product,
        },
      };

      jest
        .spyOn(productsService, 'createProduct')
        .mockImplementationOnce(() => Promise.resolve(result));
      expect(await productsController.createProduct(product)).toBe(result);
    });
    it('then should get an error messages when user wants to create a product and name is null', async () => {
      const result: CreateProductResponseDto = {
        status: HttpStatus.BAD_GATEWAY,
        message: 'Invalid Name',
        data: {
          id: 'someId',
          name: '',
          ...product,
        },
      };

      jest
        .spyOn(productsService, 'createProduct')
        .mockImplementationOnce(() => Promise.resolve(result));
      expect(await productsController.createProduct(product)).toBe(result);
    });
    it('then should get an error messages when user wants to create a product and price is null or not a number', async () => {
      const result: CreateProductResponseDto = {
        status: HttpStatus.BAD_GATEWAY,
        message: 'Invalid Price',
        data: {
          id: 'someId',
          price: 'someprice',
          ...product,
        },
      };

      jest
        .spyOn(productsService, 'createProduct')
        .mockImplementationOnce(() => Promise.resolve(result));
      expect(await productsController.createProduct(product)).toBe(result);
    });

    it('then should get an error messages when user wants to create a product and category is invalid', async () => {
      const result: CreateProductResponseDto = {
        status: HttpStatus.BAD_GATEWAY,
        message: 'Invalid Category',
        data: {
          id: 'someId',
          category: '',
          ...product,
        },
      };

      jest
        .spyOn(productsService, 'createProduct')
        .mockImplementationOnce(() => Promise.resolve(result));
      expect(await productsController.createProduct(product)).toBe(result);
    });
    it('then user should get a success message and all products when performing get all products', async () => {
      const result: GetAllProductsResponseDto = {
        status: HttpStatus.OK,
        data: [
          {
            name: 'new product',
            description: 'shit detailsaaaa',
            images: ['image1', 'image2'],
            id: '84bae457-616a-4562-8d8a-7829984608d7',
            price: 22,
            category: 'ea5e2360-39c8-4f7a-b2e1-3d7108bcba41',
          },
        ],
        count: 1,
        scannedCount: 1,
      };

      jest
        .spyOn(productsService, 'findAllProducts')
        .mockImplementationOnce(() => Promise.resolve(result));
      expect(await productsController.findAllProdutcs()).toBe(result);
    });
    it('then user should get a success message and all products when performing get product id', async () => {
      const result: GetProductResponseDto = {
        status: HttpStatus.OK,
        data: [
          {
            name: 'new product',
            description: 'shit detailsaaaa',
            images: ['image1', 'image2'],
            id: '84bae457-616a-4562-8d8a-7829984608d7',
            price: 22.22,
            category: 'ea5e2360-39c8-4f7a-b2e1-3d7108bcba41',
          },
        ],
        count: 1,
        scannedCount: 1,
      };

      jest
        .spyOn(productsService, 'findOneProduct')
        .mockImplementationOnce(() => Promise.resolve(result));
      expect(
        await productsController.findOneProduct(
          '84bae457-616a-4562-8d8a-7829984608d7',
        ),
      ).toBe(result);
    });

    it('then user should get a success message and messages when performing update product', async () => {
      const result: UpdateProductResponseDto = {
        status: HttpStatus.OK,
        data: {},
        message: 'udpated',
      };

      jest
        .spyOn(productsService, 'updateProduct')
        .mockImplementationOnce(() => Promise.resolve(result));
      expect(
        await productsController.updateProduct(
          '84bae457-616a-4562-8d8a-7829984608d7',
          {
            price: 34,
            images: ['src', 'src'],
            description: 'variable2',
            name: 'new aaaa',
            updatedDate: 'some date',
          },
        ),
      ).toBe(result);
    });
    it('then user should get a success message and messages when performing remove product', async () => {
      const result: UpdateProductResponseDto = {
        status: HttpStatus.OK,
        data: {},
        message: 'Deleted',
      };

      jest
        .spyOn(productsService, 'removeProduct')
        .mockImplementationOnce(() => Promise.resolve(result));
      expect(
        await productsController.removeProduct(
          '84bae457-616a-4562-8d8a-7829984608d7',
        ),
      ).toBe(result);
    });
  });
});
