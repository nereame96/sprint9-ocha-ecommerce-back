import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomTeaDto } from './dto/create-custom-tea.dto';
import { UpdateCustomTeaDto } from './dto/update-custom-tea.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomTea, CustomTeaDocument } from './schemas/custom-tea.schema';

@Injectable()
export class CustomTeaService {

  constructor( @InjectModel(CustomTea.name) private customTeaModel: Model<CustomTeaDocument> ) {}

   async create(createCustomTeaDto: CreateCustomTeaDto, userId: string) {
    const newCustomTea = new this.customTeaModel({
      ...createCustomTeaDto,
      userId: userId,
      
    });

    return newCustomTea.save();
  }

  async findAll(): Promise<CustomTea[]> {
    return this.customTeaModel.find().exec();
  }

  async findOne(id: string): Promise<CustomTea>  {
    const customTea = await this.customTeaModel.findById(id).exec()
    
            if(!customTea) {
                throw new NotFoundException(`Product with id: ${id} not found`)
            }
            return customTea
  }


  async findByCreator(userId: string): Promise<CustomTea[]> {
    return this.customTeaModel.find({ userId: userId }).exec();
  }


  async update(id: string, updateCustomTeaDto: UpdateCustomTeaDto, userId: string): Promise<CustomTea> {
    const customTea = await this.findOne(id)

    if (customTea.userId !== userId) {
      throw new ForbiddenException('No authorized to edit this Custom Tea')
    }
    const updatedCustomTea = await this.customTeaModel.findByIdAndUpdate(id, updateCustomTeaDto, { new: true, runValidators: true}).exec()

        if (!updatedCustomTea) {
            throw new NotFoundException(`Product with id: ${id} not found`)
        }

        return updatedCustomTea
  }

  async remove(id: string, userId: string): Promise<void> {
    const customTea = await this.findOne(id)

    if (customTea.userId !== userId) {
      throw new ForbiddenException('No authorized to delete this Custom Tea')
    }
    
    const result = await this.customTeaModel.deleteOne( { _id: id } ).exec()

        if (result.deletedCount === 0) {
            throw new NotFoundException(`Product with id: ${id} not found`)
        }
  }
}
