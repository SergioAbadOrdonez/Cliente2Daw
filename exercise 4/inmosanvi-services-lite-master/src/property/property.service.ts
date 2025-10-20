import { Collection, EntityRepository, ref } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ImageService } from 'src/commons/image/image.service';
import { Town } from 'src/town/entitites/town.entity';
import { AddPhotoDto } from './dto/add-photo.dto';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyPhoto } from './entities/property_photo.entity';
import {
  PropertyState,
  RealstateProperty,
} from './entities/realstate_property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(RealstateProperty)
    private readonly propertyRepository: EntityRepository<RealstateProperty>,
    @InjectRepository(PropertyPhoto)
    private readonly photoRepository: EntityRepository<PropertyPhoto>,
    private readonly imageService: ImageService,
  ) {}

  findAll() {
    return this.propertyRepository.findAll({
      where: { status: { $ne: PropertyState.SOLD } },
      populate: ['mainPhoto', 'town', 'town.province'],
      orderBy: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    return await this.propertyRepository.findOneOrFail(id, {
      populate: ['mainPhoto', 'town', 'town.province'],
    });
  }

  async create(createPropertyDto: CreatePropertyDto) {
    const photoUrl = await this.imageService.saveImage(
      'properties',
      createPropertyDto.mainPhoto,
    );

    const mainPhoto = new PropertyPhoto(photoUrl);
    mainPhoto.isMain = true;
    const property = new RealstateProperty(createPropertyDto, mainPhoto);
    mainPhoto.property = property;

    await this.propertyRepository.getEntityManager().persistAndFlush(property);
    await this.propertyRepository.populate(property, ['town', 'town.province']);
    property.photos = new Collection<PropertyPhoto>(property);
    return property;
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    const property = await this.propertyRepository.findOneOrFail(id);
    Object.assign(property, updatePropertyDto);
    if (updatePropertyDto.townId) {
      property.town = ref(Town, updatePropertyDto.townId);
    }
    return this.propertyRepository.getEntityManager().persistAndFlush(property);
  }

  async remove(id: number) {
    const property = await this.propertyRepository.findOneOrFail(id, {
      populate: ['mainPhoto'],
    });
    await this.imageService.removeImage(property.mainPhoto!.getEntity().url);
    return await this.propertyRepository
      .getEntityManager()
      .removeAndFlush(property);
  }

  async addphoto(id: number, addPhotoDto: AddPhotoDto) {
    const property = await this.propertyRepository.findOneOrFail(id, {
      populate: ['photos'],
    });
    const photoUrl = await this.imageService.saveImage(
      'properties',
      addPhotoDto.photo,
    );
    const photo = new PropertyPhoto(photoUrl);
    photo.property = property;
    property.photos.add(photo);
    await this.photoRepository.getEntityManager().persistAndFlush(photo);
    return photo;
  }

  async removePhoto(propertyId: number, photoId: number) {
    const property = await this.propertyRepository.findOneOrFail(propertyId, {
      populate: ['photos', 'mainPhoto'],
    });
    const photo = await this.photoRepository.findOneOrFail(photoId, {
      populate: ['property'],
    });
    if (photo.property.id !== property.id) {
      throw new ForbiddenException(
        "This photo doesn't belong to this property. You can't remove it",
      );
    }
    if (property.mainPhoto?.id === photo.id) {
      throw new ForbiddenException("You can't remove the main photo");
    }
    property.photos.remove(photo);
    await this.photoRepository.getEntityManager().removeAndFlush(photo);
    await this.imageService.removeImage(photo.url);
  }

  async setMainPhoto(propertyId: number, photoId: number) {
    const property = await this.propertyRepository.findOneOrFail(propertyId, {
      populate: ['photos', 'mainPhoto'],
    });
    const photo = await this.photoRepository.findOneOrFail(photoId, {
      populate: ['property'],
    });
    if (photo.property.id !== property.id) {
      throw new ForbiddenException(
        "This photo doesn't belong to this property. You can't set it as main",
      );
    }
    if (property.mainPhoto?.id === photo.id) {
      return;
    }
    if (property.mainPhoto) {
      property.mainPhoto.getEntity().isMain = false;
      await this.photoRepository.getEntityManager().flush();
    }
    photo.isMain = true;
    property.mainPhoto = ref(photo);
    await this.photoRepository.getEntityManager().persistAndFlush(property);
  }
}
