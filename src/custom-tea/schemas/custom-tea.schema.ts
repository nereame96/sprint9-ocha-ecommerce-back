import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from 'src/common/enums/base.enum';
import { Size } from 'src/common/enums/size.enum';
import { Ingredients } from 'src/common/enums/ingredients.enum';

export type CustomTeaDocument = CustomTea & Document;

@Schema({ timestamps: true }) 
export class CustomTea {
  
  @Prop({ required: true, trim: true })
  userId: string;

  @Prop({ required: true, trim: true, minLength: 3, maxLength: 100 })
  name: string;

  @Prop({ required: true, type: String, enum: Base })
  base: Base;

  @Prop({ required: true, enum: Object.values(Ingredients), type: [String] })
  ingredients: Ingredients[];

  @Prop({ required: true, min: 0 })
  calculatedPrice: number;

  @Prop({ required: true, min: 0 })
  intensity: number;

  @Prop({ required: true, type: String, enum: Size })
  size: Size;

  @Prop({ required: true, trim: true })
  imageUrl: string;
}

export const CustomTeaSchema = SchemaFactory.createForClass(CustomTea);
