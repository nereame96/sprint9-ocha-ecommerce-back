import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { StoreLocationsService } from './store-locations.service';
import { CreateStoreLocationDto } from './dto/create-store-location.dto';
import { UpdateStoreLocationDto } from './dto/update-store-location.dto';
import { StoreLocation } from './schemas/store-location.schema';

@Controller('store-locations')
export class StoreLocationsController {
  constructor(private readonly storeLocationsService: StoreLocationsService) {}

  
  @Get()
  async findAll(): Promise<StoreLocation[]> {
    return this.storeLocationsService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StoreLocation> {
    return this.storeLocationsService.findOne(id);
  }
  
  @Post()
  async create(@Body() createStoreLocationDto: CreateStoreLocationDto): Promise<StoreLocation> {
    return this.storeLocationsService.create(createStoreLocationDto);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStoreLocationDto: UpdateStoreLocationDto): Promise<StoreLocation> {
    return this.storeLocationsService.update(id, updateStoreLocationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.storeLocationsService.remove(id);
  }
}
