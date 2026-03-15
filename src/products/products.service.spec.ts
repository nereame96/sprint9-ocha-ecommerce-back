// products.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProductModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const mockProducts = [
        { _id: '1', name: 'Té Verde', price: 10 },
        { _id: '2', name: 'Té Negro', price: 8 },
      ];

      mockProductModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockProducts),
      });

      const result = await service.findAll();

      expect(result).toEqual(mockProducts);
      expect(mockProductModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const mockProduct = { _id: '1', name: 'Té Verde', price: 10 };

      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockProduct),
      });

      const result = await service.findOne('1');

      expect(result).toEqual(mockProduct);
      expect(mockProductModel.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('decreaseStock', () => {
    it('should decrease product stock', async () => {
      const mockProduct = {
        _id: '1',
        name: 'Té Verde',
        stock: 50,
        save: jest.fn().mockResolvedValue(true),
      };

      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockProduct),
      });

      await service.decreaseStock('1', 5);

      expect(mockProduct.stock).toBe(45);
      expect(mockProduct.save).toHaveBeenCalled();
    });

    it('should throw error if insufficient stock', async () => {
      const mockProduct = {
        _id: '1',
        name: 'Té Verde',
        stock: 2,
      };

      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockProduct),
      });

      await expect(service.decreaseStock('1', 5)).rejects.toThrow(
        'Not enough stock',
      );
    });
  });
});