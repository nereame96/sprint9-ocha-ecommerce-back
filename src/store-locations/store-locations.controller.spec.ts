import { Test, TestingModule } from '@nestjs/testing';
import { StoreLocationsController } from './store-locations.controller';
import { StoreLocationsService } from './store-locations.service';

describe('StoreLocationsController', () => {
  let controller: StoreLocationsController;

  const mockStoreLocationsService = {
    findAll: jest.fn().mockResolvedValue([
      { _id: '1', name: 'Store 1', lat: 40.0, lng: -3.0 },
    ]),
    findOne: jest.fn().mockResolvedValue({
      _id: '1',
      name: 'Store 1',
      lat: 40.0,
      lng: -3.0,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreLocationsController],
      providers: [
        {
          provide: StoreLocationsService,
          useValue: mockStoreLocationsService,
        },
      ],
    }).compile();

    controller = module.get<StoreLocationsController>(
      StoreLocationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});