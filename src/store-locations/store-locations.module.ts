import { Module } from '@nestjs/common';
import { StoreLocationsService } from './store-locations.service';
import { StoreLocationsController } from './store-locations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreLocation, StoreLocationSchema } from './schemas/store-location.schema';


@Module({
  imports: [
    MongooseModule.forFeature([ { name: StoreLocation.name, schema: StoreLocationSchema } ]),
  ],
  controllers: [StoreLocationsController],
  providers: [StoreLocationsService],
})
export class StoreLocationsModule {}
