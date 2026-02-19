import { IsNotEmpty, IsString, MinLength, MaxLength, IsEnum, IsNumber } from "class-validator";
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

    @IsNotEmpty({message: 'Price is mandatory'})
    @IsNumber({}, {message: 'Price must be a number'})
    price: number;

    @IsEnum(Category)
    category: Category

    @IsEnum(Intensity)
    intensity: Intensity;

    @IsNotEmpty({message: 'ImageUrl is mandatory' })
    @IsString({message: 'ImageUrl must be a chain of text'})
    imageUrl: string;



}