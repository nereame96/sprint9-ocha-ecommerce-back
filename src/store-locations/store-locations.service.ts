import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateStoreLocationDto } from './dto/create-store-location.dto';
import { UpdateStoreLocationDto } from './dto/update-store-location.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StoreLocationDocument, StoreLocation } from './schemas/store-location.schema';

@Injectable()
export class StoreLocationsService {

  constructor( @InjectModel(StoreLocation.name) private storeLocationModel: Model<StoreLocationDocument> ) {}

  async create(createStoreLocationDto: CreateStoreLocationDto): Promise<StoreLocation> {
    try {
            const createdStoreLocation = new this.storeLocationModel(createStoreLocationDto)
            return await createdStoreLocation.save()

        } catch (error) {
            if( error.code === 11000) {
                throw new ConflictException('Store Location already exist')
            }
            throw error;
        }
  }

  async findAll(): Promise<StoreLocation[]> {
     return this.storeLocationModel.find().exec()
  }

  async findOne(id: string): Promise<StoreLocation> {
    const storeLocation = await this.storeLocationModel.findById(id).exec()
    
            if(!storeLocation) {
                throw new NotFoundException(`Store location with id: ${id} not found`)
            }
            return storeLocation
  }

  async update(id: string, updateStoreLocationDto: UpdateStoreLocationDto): Promise<StoreLocation> {
    const existingProduct = await this.storeLocationModel.findByIdAndUpdate(id, updateStoreLocationDto, { new: true, runValidators: true}).exec()

        if (!existingProduct) {
            throw new NotFoundException(`Store location with id: ${id} not found`)
        }

        return existingProduct
  }

  async remove(id: string): Promise<void> {
    const result = await this.storeLocationModel.deleteOne( { _id: id } ).exec()

        if (result.deletedCount === 0) {
            throw new NotFoundException(`Store location with id: ${id} not found`)
        }
  }
}
