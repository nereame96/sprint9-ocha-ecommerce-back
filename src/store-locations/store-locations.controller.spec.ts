import { Test, TestingModule } from '@nestjs/testing';
import { StoreLocationsController } from './store-locations.controller';
import { StoreLocationsService } from './store-locations.service';

describe('StoreLocationsController', () => {
  let controller: StoreLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreLocationsController],
      providers: [StoreLocationsService],
    }).compile();

    controller = module.get<StoreLocationsController>(StoreLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
