import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { RealstateProperty } from './entities/realstate_property.entity';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { CommonsModule } from 'src/commons/commons.module';
import { PropertyPhoto } from './entities/property_photo.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([RealstateProperty, PropertyPhoto]),
    CommonsModule,
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
