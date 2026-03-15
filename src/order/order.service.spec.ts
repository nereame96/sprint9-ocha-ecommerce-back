
import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getModelToken } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { ProductsService } from '../products/products.service';
import { CustomTeaService } from '../custom-tea/custom-tea.service';

describe('OrdersService', () => {
  let service: OrderService;
  let productsService: ProductsService;


  const mockOrderModel = function(dto: any) {
    return {
      ...dto,
      _id: 'order1',
      save: jest.fn().mockResolvedValue({ ...dto, _id: 'order1' }),
    };
  };

  mockOrderModel.create = jest.fn();
  mockOrderModel.find = jest.fn();
  mockOrderModel.findById = jest.fn();

  const mockProductsService = {
    findOne: jest.fn(),
    decreaseStock: jest.fn(),
  };

  const mockCustomTeaService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getModelToken(Order.name),
          useValue: mockOrderModel,
        },
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
        {
          provide: CustomTeaService,
          useValue: mockCustomTeaService,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an order and decrease stock', async () => {
      const createOrderDto: any = {
        products: [{ 
          productId: '1', 
          quantity: 2, 
          unitPrice: 10, 
          name: 'Té', 
          imageUrl: '' 
        }],
        customTeas: [],
        totalAmount: 20,
        totalItems: 2,
        paymentMethod: 'card',
        deliveryAddress: {
          street: 'Calle 1',
          city: 'Madrid',
          postalCode: '28001',
          country: 'España',
        },
      };

      const mockProduct = { _id: '1', stock: 50 };
      mockProductsService.findOne.mockResolvedValue(mockProduct);
      mockProductsService.decreaseStock.mockResolvedValue(undefined);

      const result = await service.create(createOrderDto, 'user1');

      expect(productsService.decreaseStock).toHaveBeenCalledWith('1', 2);
      expect(result).toHaveProperty('_id');
      expect(result.totalAmount).toBe(20);
    });
  });

  describe('findByUserId', () => {
    it('should return orders for a user', async () => {
      const mockOrders = [
        { _id: 'order1', userId: 'user1', totalAmount: 50 },
        { _id: 'order2', userId: 'user1', totalAmount: 30 },
      ];

     
      mockOrderModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockOrders),
      });

      const result = await service.findByUserId('user1');

      expect(result).toEqual(mockOrders);
      expect(mockOrderModel.find).toHaveBeenCalledWith({ userId: 'user1' });
    });
  });
});