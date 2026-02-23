import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomTeaService } from './custom-tea.service';
import { CreateCustomTeaDto } from './dto/create-custom-tea.dto';
import { UpdateCustomTeaDto } from './dto/update-custom-tea.dto';

@Controller('custom-tea')
export class CustomTeaController {
  constructor(private readonly customTeaService: CustomTeaService) {}

  @Post()
  create(@Body() createCustomTeaDto: CreateCustomTeaDto) {
    return this.customTeaService.create(createCustomTeaDto);
  }

  @Get()
  findAll() {
    return this.customTeaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customTeaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomTeaDto: UpdateCustomTeaDto) {
    return this.customTeaService.update(+id, updateCustomTeaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customTeaService.remove(+id);
  }
}
