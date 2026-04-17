import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Category } from '../../common/enums/category.enum';
import { Intensity } from 'src/common/enums/intensity.enum';
import { RawMaterialType } from 'src/common/enums/raw-materials-type';


export type RawMaterialDocument = RawMaterial & Document;

@Schema({ timestamps: true})
export class RawMaterial {

    _id!: Types.ObjectId;

    @Prop({ required: true, trim: true, minLength: 3, maxLength: 100 })
    name!: string;

    @Prop({ required: true, enum: RawMaterialType, type: String})
    type!: RawMaterialType; 

    @Prop({ required: true, min: 0} )
    pricePerGram!: number;

    @Prop({ required: true, min: 0, default: 0})
    stockGrams!: number;

    @Prop({ default: 0 })
    stockCount?: number;

    @Prop({ required: true, trim: true})
    imageUrl!: string;
    
} 

export const RawMaterialSchema = SchemaFactory.createForClass(RawMaterial)