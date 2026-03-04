import { IsNotEmpty, IsString, MinLength, MaxLength, IsEnum, IsNumber, Min, Max, IsUrl, IsOptional, IsBoolean } from "class-validator";
import { Category } from "src/common/enums/category.enum";
import { Intensity } from "src/common/enums/intensity.enum";



export class CreateProductDto {
    @IsNotEmpty({message: 'Name is mandatory' })
    @IsString({message: 'Name must be a chain of text'})
    @MinLength(3, { message: 'Name must have at least 3 characters' })
    @MaxLength(100, { message: 'Name cannot be have more than 100 characters' })
    name: string;

    @IsNotEmpty({message: 'Description is mandatory' })
    @IsString({message: 'Description must be a chain of text'})
    @MinLength(10, { message: 'Description must have at least 10 characters' })
    @MaxLength(500, { message: 'Description cannot be have more than 500 characters' })
    description: string;

    @IsNumber({}, {message: 'Price must be a number'})
    @Min(0, {message: 'Stock cannot be inferior of 0'})
    price: number;

    @IsNumber({}, {message: 'Stock must be a number'})
    @Min(0,  {message: 'Stock cannot be inferior of 0'} )
    stock: number;

    @IsEnum(Category)
    category: Category

    // @IsEnum(Quantity)  ya no se necesita todo es 100gr
    // quantity: Quantity

    @IsEnum(Intensity)
    intensity: Intensity;

    @IsUrl()
    imageUrl: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    soldCount?: number;



}