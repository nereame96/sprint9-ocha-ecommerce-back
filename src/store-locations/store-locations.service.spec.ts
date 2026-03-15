import { Test, TestingModule } from '@nestjs/testing';
import { StoreLocationsService } from './store-locations.service';
import { getModelToken } from '@nestjs/mongoose';
import { StoreLocation } from './schemas/store-location.schema';

describe('StoreLocationsService', () => {
  let service: StoreLocationsService;

  const mockStoreLocationModel = {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([
        { _id: '1', name: 'Store 1', lat: 40.0, lng: -3.0 },
        { _id: '2', name: 'Store 2', lat: 41.0, lng: 2.0 },
      ]),
    }),
    findById: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({
        _id: '1',
        name: 'Store 1',
        lat: 40.0,
        lng: -3.0,
      }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreLocationsService,
        {
          provide: getModelToken(StoreLocation.name),
          useValue: mockStoreLocationModel,
        },
      ],
    }).compile();

    service = module.get<StoreLocationsService>(StoreLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all store locations', async () => {
    const result = await service.findAll();
    expect(result).toHaveLength(2);
    expect(mockStoreLocationModel.find).toHaveBeenCalled();
  });
});