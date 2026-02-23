import { IsNotEmpty, IsString, MaxLength, MinLength, IsNumber } from "class-validator";

export class CreateStoreLocationDto {
    @IsNotEmpty({message: 'Name is mandatory' })
    @IsString({message: 'Name must be a chain of text'})
    @MinLength(3, { message: 'Name must have at least 3 characters' })
    @MaxLength(100, { message: 'Name cannot be have more than 100 characters' })
    name: string;

    @IsNotEmpty({message: 'Name is mandatory' })
    @IsString({message: 'Name must be a chain of text'})
    @MinLength(3, { message: 'Name must have at least 3 characters' })
    @MaxLength(100, { message: 'Name cannot be have more than 100 characters' })
    address: string;

    @IsNumber({}, {message: 'Latitude must be a number'})
    lat: number;

    @IsNumber({}, {message: 'Longitude must be a number'})
    lng: number;


}
