import { Injectable, NotFoundException } from '@nestjs/common';
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

  update(id: number, updateCustomTeaDto: UpdateCustomTeaDto) {
    return `This action updates a #${id} customTea`;
  }

  remove(id: number) {
    return `This action removes a #${id} customTea`;
  }
}
