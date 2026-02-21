import { IsNotEmpty } from 'class-validator';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Type } from '@nestjs/common';
import { Category } from '../../common/enums/category.enum';
import { Intensity } from 'src/common/enums/intensity.enum';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true}) // createdAt y updatedAt por defecto
export class Product {
    
    // _id por defecto

    @Prop({ required: true, trim: true, minLength: 3, maxLength: 100 })
    name: string;

    @Prop({ required: true, trim: true, minLength: 10, maxLength: 500})
    description: string;

    @Prop({ required: true, min: 0})
    price: number;

    @Prop({ required: true, enum: Category})
    category: Category; 

    @Prop({ required: true, enum: Intensity})
    intensity: Intensity; 

    @Prop({ required: true, trim: true})
    imageUrl: string;

} 

export const ProductSchema = SchemaFactory.createForClass(Product)