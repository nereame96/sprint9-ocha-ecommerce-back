import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StoreLocationDocument = StoreLocation & Document;

@Schema({ timestamps: true}) // createdAt y updatedAt por defecto
export class StoreLocation {
    
    // _id por defecto

    @Prop({ required: true, trim: true, minLength: 3, maxLength: 100 })
    name: string;

    @Prop({ required: true, trim: true, minLength: 3, maxLength: 100 })
    address: string;

    @Prop({ required: true})
    lat: number;

    @Prop({ required: true})
    lng: number;
}

export const StoreLocationSchema = SchemaFactory.createForClass(StoreLocation)