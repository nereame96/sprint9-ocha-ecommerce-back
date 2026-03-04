import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { ProductsModule } from 'src/products/products.module';
import { CustomTeaModule } from 'src/custom-tea/custom-tea.module';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: Order.name, schema: OrderSchema } ]),
    ProductsModule,
    CustomTeaModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  
})
export class OrderModule {}
