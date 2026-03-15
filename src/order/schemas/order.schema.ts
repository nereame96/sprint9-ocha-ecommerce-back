import { Status } from './../../common/enums/status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PaymentMethod } from 'src/common/enums/payment-method.enum';
import { CustomTea } from 'src/custom-tea/schemas/custom-tea.schema';
import { Product } from 'src/products/schemas/product.schema';


class OrderProduct {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  name: string;  

  @Prop({ required: true })
  imageUrl: string;  

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unitPrice: number;
}

class OrderCustomTea {
  @Prop({ required: true })
  customTeaId: string;

  @Prop({ required: true })
  name: string;  

  @Prop({ required: true })
  imageUrl: string;  

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unitPrice: number;
}


class DeliveryAddress {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  country: string;
}

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
    
    @Prop({ type: Types.ObjectId, required: true })
    userId: Types.ObjectId;

    @Prop({ type: [Object], default: [] })
    products: OrderProduct[];

    @Prop({ type: [Object], default: [] })
    customTeas: OrderCustomTea[];

    @Prop({ required: true })
    totalAmount: number; //ya viene del front calculado

    @Prop({ required: true })
    totalItems: number; //ya viene del front calculado
    
    @Prop({ required: true, type: String, enum: Status, default: 'paid' })
    status: Status

    @Prop({ required: true, type: String, enum: PaymentMethod, default: 'card' })
    paymentMethod: PaymentMethod;

    @Prop()
    cardLast4?: string;

    @Prop({ default: true })
    isPaid: boolean; //Simular pago

    @Prop({ default: Date.now })
    paidAt: Date;

    @Prop({ type: Object, required: true })
    deliveryAddress: DeliveryAddress

    @Prop( )
    phone: string;
    

}

export const OrderSchema = SchemaFactory.createForClass(Order);