import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import mikroOrmConfig from './mikro-orm.config';
import { TownModule } from './town/town.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), TownModule, PropertyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
