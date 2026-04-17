import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber, Min, IsEnum, IsOptional, IsBoolean, Max } from "class-validator";
import { RawMaterialType } from "src/common/enums/raw-materials-type";

export class CreateRawMaterialDto {
    @IsNotEmpty({message: 'Name is mandatory' })
    @IsString({message: 'Name must be a chain of text'})
    @MinLength(3, { message: 'Name must have at least 3 characters' })
    @MaxLength(100, { message: 'Name cannot be have more than 100 characters' })
    name!: string;

    @IsEnum(RawMaterialType)
    type!: RawMaterialType

    @IsNumber({}, {message: 'Price must be a number'})
    @Min(0)
    pricePerGram!: number

    @IsNumber({}, {message: 'Stock must be a number'})
    @Min(0,  {message: 'Stock cannot be inferior of 0'} )
    stockGrams!: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    stockSold?: number;

    @IsString()
    imageUrl!: string;


    
    
}
