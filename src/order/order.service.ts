import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { ProductsService } from 'src/products/products.service';
import { CustomTeaService } from 'src/custom-tea/custom-tea.service';
import { Model } from 'mongoose';
import { Status } from 'src/common/enums/status.enum';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private productsService: ProductsService,
    private customTeaService: CustomTeaService,
  ) {}

  async create( createOrderDto: CreateOrderDto, userId: string) {
    
    for (const item of createOrderDto.products) {
      const product = await this.productsService.findOne(item.productId)

      if (!product) {
        throw new NotFoundException(`Producct ${item.productId} not found`)
      }

      if(product.stock < item.quantity) {
        throw new BadRequestException(`Not enough stock of ${product.name}. Available: ${product.stock}`)
      }
    }

    for (const item of createOrderDto.customTeas) {
      const customTea = await this.customTeaService.findOne(item.customTeaId)

      if (!customTea) {
        throw new NotFoundException(`Producct ${item.customTeaId} not found`)
    }
    }

    for ( const item of createOrderDto.products){
      await this.productsService.decreaseStock(item.productId, item.quantity)
    }

    const order = new this.orderModel({
      ...createOrderDto,
      userId: userId,
      isPaid: true,
      paidAt: new Date(),
      status: 'paid'
    })

    return order.save()
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec()
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id)

    if (!order) {
      throw new NotFoundException(`Order with id: ${id} not found`)
    }

    return order
  }

  async findByUserId( userId: string ) {
    return this.orderModel.find({userId: userId}).exec()
  }

  async updateStatus( id: string, status: Status ) {
    
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      {status},
      { new: true }
    ).exec()

    if(!order) throw new NotFoundException(`Order: ${id} not found`)
    
    return order;
  }
}
