import { Status } from './../../common/enums/status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PaymentMethod } from 'src/common/enums/payment-method.enum';
import { CustomTea } from 'src/custom-tea/schemas/custom-tea.schema';
import { Product } from 'src/products/schemas/product.schema';



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
    products: Product[];

    @Prop({ type: [Object], default: [] })
    customTeas: CustomTea[];

    @Prop({ required: true })
    totalAmount: number;

    @Prop({ required: true })
    totalItems: number;
    
    @Prop({ required: true, enum: Status, default: 'paid' })
    status: Status

    @Prop({ required: true, enum: PaymentMethod, default: 'card' })
    paymentMethod: PaymentMethod;

    @Prop()
    cardLast4?: string;

    @Prop({ default: true })
    isPaid: boolean; //Simular pago

    @Prop({ default: Date.now })
    paidAt: Date;

    @Prop({ type: Object, required: true })
    deliveryAddress: DeliveryAddress
    

}

export const OrderSchema = SchemaFactory.createForClass(Order);