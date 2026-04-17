import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomTeaDto } from './dto/create-custom-tea.dto';
import { UpdateCustomTeaDto } from './dto/update-custom-tea.dto';
import { InjectModel, raw } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomTea, CustomTeaDocument } from './schemas/custom-tea.schema';
import { RawMaterialsService } from 'src/raw-materials/raw-materials.service';

@Injectable()
export class CustomTeaService {

  constructor( 
    @InjectModel(CustomTea.name) private customTeaModel: Model<CustomTeaDocument>,
    private rawMaterialService: RawMaterialsService ) {}

   async create(createCustomTeaDto: CreateCustomTeaDto, userId: string) {

    const { baseGrams, eachIngredientsGrams} = this.calculateRecipeGrams(
      createCustomTeaDto.size,
      createCustomTeaDto.ingredients.length
    )

    const allIdsToFetch = [createCustomTeaDto.base, ...createCustomTeaDto.ingredients]

    const rawMaterials = await this.rawMaterialService.findManyByIds(allIdsToFetch)

    if (rawMaterials.length !== allIdsToFetch.length) {
      throw new NotFoundException('Some of the selected ingredients not found')
    }

    
    const selectedBase = rawMaterials.find( item => item._id.toString() === createCustomTeaDto.base)
    const selectedIngredients = rawMaterials.filter( item => createCustomTeaDto.ingredients.includes(item._id.toString()))
    
    if (!selectedBase) {
      throw new NotFoundException('Base not found')
    }

    const baseCost = selectedBase.pricePerGram * baseGrams
    let ingredientsCost = 0 

    selectedIngredients.forEach(ingredient => {
      ingredientsCost += ingredient?.pricePerGram * eachIngredientsGrams
    });


    let calculatedPrice = baseCost + ingredientsCost

    switch (createCustomTeaDto.size) {
      case 50:
        calculatedPrice = calculatedPrice * 1.5
        break;
      case 100:
        calculatedPrice = calculatedPrice * 1.3
        break;
      case 250:
        calculatedPrice = calculatedPrice * 1.1
        break;
    
      default:
        break;
    }


    const newCustomTea = new this.customTeaModel({
      ...createCustomTeaDto,
      userId: userId,
      price: Math.round(calculatedPrice * 100) / 100,
      baseGrams: baseGrams,
      ingredientsGrams: eachIngredientsGrams
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

  calculateRecipeGrams(totalGrams: number, numIngredients: number ) {
    let baseGrams = 0
    let eachIngredientsGrams = 0

    if (numIngredients === 0) {
      baseGrams = totalGrams
    }

    if (numIngredients === 1) {
      baseGrams = totalGrams * 0.8
      eachIngredientsGrams = totalGrams * 0.2
    }

    if (numIngredients > 1) {
      const totalIngredientsWeight = totalGrams * 0.4

      eachIngredientsGrams = Math.round( totalIngredientsWeight / numIngredients )

      baseGrams = totalGrams - (eachIngredientsGrams * numIngredients)
    }


    return {
      baseGrams,
      eachIngredientsGrams
    }


  }
}
