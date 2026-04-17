import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { RawMaterial, RawMaterialDocument } from './schemas/raw-material.schema';
import { InjectModel, raw } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RawMaterialsService {

  constructor( @InjectModel(RawMaterial.name) private rawMaterialModel: Model<RawMaterialDocument> ) {}

  async create(createRawMaterialDto: CreateRawMaterialDto): Promise<RawMaterial> {
    try {
          const createdRawMaterial = new this.rawMaterialModel(createRawMaterialDto)
          return await createdRawMaterial.save()

      } catch (error) {
          if( (error as any).code === 11000) {
              throw new ConflictException('Raw material already exist')
          }
          throw error;
      }
  }

  async findAll(): Promise<RawMaterial[]> {
    return this.rawMaterialModel.find().exec();
  }

  async findOne(id: string): Promise<RawMaterialDocument> {
    const rawMaterial = await this.rawMaterialModel.findById(id).exec()

    if(!rawMaterial) {
      throw new NotFoundException(`Raw material with id: ${id} not found`)
    }
    return rawMaterial
  }

  async update(id: string, updateRawMaterialDto: UpdateRawMaterialDto): Promise<RawMaterial> {
    const existingRawMaterial = await this.rawMaterialModel.findByIdAndUpdate(id, updateRawMaterialDto, { new: true, runValidators: true}).exec()

    if (!existingRawMaterial) {
      throw new NotFoundException(`Raw material with id: ${id} not found`)
    }

    return existingRawMaterial
  }

  async remove(id: string): Promise<void> {
    const result = await this.rawMaterialModel.deleteOne( {_id: id}).exec()

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Raw material with id: ${id} not found`)
    }
  }

  async decreaseStock(id: string, quantity: number): Promise<void> {
    const rawMaterial = await this.findOne(id)

    if ( rawMaterial.stockGrams < quantity ) {
      throw new BadRequestException(`Not enough stock of ${rawMaterial}. Available: ${rawMaterial.stockGrams}`)
    }

    rawMaterial.stockGrams -= quantity

    if ( rawMaterial.stockCount !== undefined) {
      rawMaterial.stockCount += quantity
    }

    await rawMaterial.save()
  }

  async decreaseMultipleStocks(items: { id: string, quantity: number} []): Promise<void> {

    await Promise.all(
      items.map( item => this.decreaseStock(item.id, item.quantity))
    )
  }

  async findManyByIds(ids: string[]): Promise<RawMaterial[]> {
    return this.rawMaterialModel.find( {_id: { $in: ids } }).exec()
  }
}
