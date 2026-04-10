import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { RawMaterialsService } from './raw-materials.service';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { ApiTags } from '@nestjs/swagger';
import { RawMaterial } from './schemas/raw-material.schema';

@ApiTags('Raw-materials')
@Controller('raw-materials')
export class RawMaterialsController {
  constructor(private readonly rawMaterialsService: RawMaterialsService) {}

  @Post()
  async create(@Body() createRawMaterialDto: CreateRawMaterialDto) {
    return this.rawMaterialsService.create(createRawMaterialDto);
  }

  @Get()
  async findAll(): Promise<RawMaterial[]> {
    return this.rawMaterialsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RawMaterial> {
    return this.rawMaterialsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRawMaterialDto: UpdateRawMaterialDto): Promise<RawMaterial> {
    return this.rawMaterialsService.update(id, updateRawMaterialDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.rawMaterialsService.remove(id);
  }
}
