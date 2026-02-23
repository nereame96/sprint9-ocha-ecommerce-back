import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from 'src/common/enums/base.enum';
import { Quantity } from 'src/common/enums/quantity.enum';
import { Ingredients } from 'src/common/enums/ingredients.enum';

export type CustomTeaDocument = CustomTea & Document;

@Schema({ timestamps: true }) // createdAt y updatedAt por defecto
export class CustomTea {
  // _id por defecto
  @Prop({ required: true, trim: true })
  userId: string;

  @Prop({ required: true, trim: true, minLength: 3, maxLength: 100 })
  name: string;

  @Prop({ required: true, enum: Base })
  base: Base;

  @Prop({ required: true, enum: Ingredients })
  ingredients: Ingredients[];

  @Prop({ required: true, min: 0 })
  calculatedPrice: number;

  @Prop({ required: true, min: 0 })
  intensity: number;

  @Prop({ required: true, enum: Quantity })
  quantity: Quantity;

  @Prop({ required: true, trim: true })
  imageUrl: string;
}

export const CustomTeaSchema = SchemaFactory.createForClass(CustomTea);
