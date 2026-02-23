import { IsNotEmpty, IsString, MinLength, MaxLength, IsEnum, IsNumber, Min, Max, IsUrl, IsOptional, IsBoolean, isEnum, IsArray } from "class-validator";
import { Base } from "src/common/enums/base.enum";
import { Quantity } from "src/common/enums/quantity.enum";
import { Ingredients } from "src/common/ingredients.enum";
export class CreateCustomTeaDto {

    @IsNotEmpty({message: 'Name is mandatory' })
    @IsString({message: 'Name must be a chain of text'})
    @MinLength(3, { message: 'Name must have at least 3 characters' })
    @MaxLength(100, { message: 'Name cannot be have more than 100 characters' })
    name: string;

    @IsEnum(Base)
    base: Base

    @IsEnum(Ingredients)
    @IsArray()
    ingredients: Ingredients[]

    @IsNumber()
    calculatedPrice: number;

    @IsNumber()
    intensity: number;

    @IsEnum(Quantity)
    quantity:Quantity 

    @IsUrl()
    imageUrl: string;

    
}
