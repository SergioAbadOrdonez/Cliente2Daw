import { RealstateProperty } from '../entities/realstate_property.entity';

export class PropertiesResponse {
  properties: RealstateProperty[];

  constructor(properties: RealstateProperty[]) {
    this.properties = properties;
  }
}
