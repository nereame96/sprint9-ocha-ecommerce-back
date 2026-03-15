import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Order } from './schemas/order.schema';
import { ApiTags } from '@nestjs/swagger';
import Stripe from 'stripe';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    _id: string;
  };
}
@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: RequestWithUser,
  ): Promise<Order>  {

    const userId = req.user.userId

    return this.orderService.create(createOrderDto, userId);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Get('user/my-orders')
  @UseGuards(JwtAuthGuard)
  async findByUserId(@Req() req: RequestWithUser) {
    return this.orderService.findByUserId(req.user.userId)
  }

  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-02-25.clover'
  } )

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() orderPayload: any) {
    const allItems = [...orderPayload.products, ...orderPayload.customTeas]

    const lineItems = allItems.map((item) => {
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.unitPrice * 100),
        },
        quantity: item.quantity,
      }
    })

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout/success`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout`,
    })
    return { url: session.url}
  }

}
