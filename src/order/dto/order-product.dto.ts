import { IsNumber, IsString, IsUrl } from 'class-validator';

export class OrderProductDto {
  @IsString()
  productId: string;

  @IsString()
  name: string;

  @IsString()
  imageUrl: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPrice: number;
}