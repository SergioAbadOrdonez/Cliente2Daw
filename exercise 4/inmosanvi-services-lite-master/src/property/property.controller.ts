import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AddPhotoDto } from './dto/add-photo.dto';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyService } from './property.service';
import { PropertiesResponse } from './responses/properties.response';
import { SinglePropertyResponse } from './responses/single_property.response';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createPropertyDto: CreatePropertyDto,
  ) {
    return new SinglePropertyResponse(
      await this.propertyService.create(createPropertyDto),
    );
  }

  // @Query('seller', new DefaultValuePipe(0), ParseIntPipe) seller?: number,
  // @Query('province', new DefaultValuePipe(0), ParseIntPipe) province?: number,
  // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
  // @Query('search', new DefaultValuePipe('')) search?: string,
  // @Query('sold', new DefaultValuePipe(false), ParseBoolPipe) sold?: boolean,
  @Get()
  async findAll() {
    // const filters = new PropertyFilters(seller, province, search, sold, page);
    return new PropertiesResponse(await this.propertyService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new SinglePropertyResponse(await this.propertyService.findOne(+id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.propertyService.remove(+id);
  }

  @Post(':id/photos')
  addPhoto(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    addPhotoDto: AddPhotoDto,
  ) {
    return this.propertyService.addphoto(+id, addPhotoDto);
  }

  @Delete(':id/photos/:photoId')
  removePhoto(@Param('id') id: string, @Param('photoId') photoId: string) {
    return this.propertyService.removePhoto(+id, +photoId);
  }

  @Put(':id/photos/:photoId/setMain')
  setMainPhoto(@Param('id') id: string, @Param('photoId') photoId: string) {
    return this.propertyService.setMainPhoto(+id, +photoId);
  }
}
