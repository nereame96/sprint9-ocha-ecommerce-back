import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CustomTeaModule } from './custom-tea/custom-tea.module';
import { CustomTeaModule } from './custom-tea/custom-tea.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/ocha-api',
    ),
    ProductsModule,
    CustomTeaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
