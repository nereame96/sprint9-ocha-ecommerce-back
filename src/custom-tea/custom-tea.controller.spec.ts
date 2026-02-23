import { Test, TestingModule } from '@nestjs/testing';
import { CustomTeaController } from './custom-tea.controller';
import { CustomTeaService } from './custom-tea.service';

describe('CustomTeaController', () => {
  let controller: CustomTeaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomTeaController],
      providers: [CustomTeaService],
    }).compile();

    controller = module.get<CustomTeaController>(CustomTeaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
