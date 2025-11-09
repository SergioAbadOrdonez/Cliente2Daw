import { Http } from './http.class.js';
import { SERVER } from './constants.js';

export class PropertiesService {
  #http = new Http();

  async getProperties() {
    const resp = await this.#http.get(`${SERVER}/properties`);
    return resp.properties;
  }

  async insertProperty(propertyObj){
    const resp = await this.#http.post(`${SERVER}/properties`,propertyObj);
    return resp.propertyObj;
  }

  async deleteProperty(propertyID){
    await this.#http.delete(`${SERVER}/properties/${propertyID}`);
  }
}

const service = new PropertiesService();
const properties = await service.getProperties();
console.log(properties);

