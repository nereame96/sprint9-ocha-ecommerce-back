import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomTeaService } from './custom-tea.service';
import { CustomTeaController } from './custom-tea.controller';
import { CustomTea, CustomTeaSchema } from './schemas/custom-tea.schema';
import { RawMaterialsModule } from 'src/raw-materials/raw-materials.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CustomTea.name, schema: CustomTeaSchema }]),
    RawMaterialsModule
  ],
  controllers: [CustomTeaController],
  providers: [CustomTeaService],
  exports: [CustomTeaService]
})
export class CustomTeaModule {}
