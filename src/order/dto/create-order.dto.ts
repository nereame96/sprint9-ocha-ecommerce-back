import { IsArray, IsNumber, ValidateNested, IsEnum, IsBoolean, IsString, IsNotEmpty, IsUrl, IsOptional, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '../../common/enums/payment-method.enum';
import { DeliveryAddressDto } from './delivery-address.dto';
import { OrderProductDto } from './order-product.dto';
import { OrderCustomTeaDto } from './order-customtea.dto';

export class CreateOrderDto {

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderProductDto)
    products: OrderProductDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderCustomTeaDto)
    customTeas: OrderCustomTeaDto[];

    @IsNumber()
    totalAmount: number;

    @IsNumber()
    totalItems: number;
    
    @IsEnum(PaymentMethod)
    paymentMethod:PaymentMethod

    @IsBoolean()
    isPaid: boolean; 
    
    @IsOptional()
    @IsString({ message: 'Last 4 number must be a chain of text' })
    cardLast4?: string;

    @ValidateNested()
    @Type(() => DeliveryAddressDto)
    @IsNotEmpty()
    deliveryAddress: DeliveryAddressDto

    @Matches(/^\d{9,15}$/, { message: 'Phone must be 9-15 digits' })
    phone: string;

}

    

