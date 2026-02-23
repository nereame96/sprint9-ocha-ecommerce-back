import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Category } from '../../common/enums/category.enum';
import { Intensity } from 'src/common/enums/intensity.enum';
import { Quantity } from 'src/common/enums/quantity.enum';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true}) // createdAt y updatedAt por defecto
export class Product {
    
    // _id por defecto

    @Prop({ required: true, trim: true, minLength: 3, maxLength: 100 })
    name: string;

    @Prop({ required: true, minLength: 10, maxLength: 500})
    description: string;

    @Prop({ required: true, min: 0})
    price: number;

    @Prop({ required: true, min: 0, default: 0})
    stock: number;

    @Prop({ required: true, enum: Category})
    category: Category; 

    @Prop({ required: true, enum: Quantity})
    quantity: Quantity; 

    @Prop({ required: true, enum: Intensity})
    intensity: Intensity; 

    @Prop({ required: true, trim: true})
    imageUrl: string;

    @Prop({ default: true })
    isActive?: boolean;  // para desactivar productos
    
    @Prop({ min: 0, max: 5 })
    rating?: number;  
    
    @Prop({ default: 0 })
    soldCount?: number;

} 

export const ProductSchema = SchemaFactory.createForClass(Product)