import { Module } from '@nestjs/common';
import { CustomTeaService } from './custom-tea.service';
import { CustomTeaController } from './custom-tea.controller';

@Module({
  controllers: [CustomTeaController],
  providers: [CustomTeaService],
})
export class CustomTeaModule {}
