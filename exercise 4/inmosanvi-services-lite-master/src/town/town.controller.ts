import { Controller, Get, Param } from '@nestjs/common';
import { TownService } from './town.service';

@Controller('provinces')
export class TownController {
  constructor(private readonly townService: TownService) {}

  @Get()
  async findAllProvinces() {
    return { provinces: await this.townService.findAllprovinces() };
  }

  @Get(':id/towns')
  async findTownsByProvince(@Param('id') id: string) {
    return { towns: await this.townService.findByProvince(+id) };
  }
}
