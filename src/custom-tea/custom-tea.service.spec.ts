import { Test, TestingModule } from '@nestjs/testing';
import { CustomTeaService } from './custom-tea.service';

describe('CustomTeaService', () => {
  let service: CustomTeaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomTeaService],
    }).compile();

    service = module.get<CustomTeaService>(CustomTeaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
