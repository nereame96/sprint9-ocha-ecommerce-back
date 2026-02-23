import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomTeaService } from './custom-tea.service';
import { CustomTeaController } from './custom-tea.controller';
import { CustomTea, CustomTeaSchema } from './schemas/custom-tea.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CustomTea.name, schema: CustomTeaSchema }]),
  ],
  controllers: [CustomTeaController],
  providers: [CustomTeaService],
})
export class CustomTeaModule {}
