import { IsNumber, IsString, IsUrl } from 'class-validator';


export class OrderCustomTeaDto {
  @IsString()
  customTeaId: string;

  @IsString()
  name: string;

  @IsString()
  imageUrl: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPrice: number;
}
