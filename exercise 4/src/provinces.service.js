import { Http } from './http.class.js';
import { SERVER } from './constants.js';

export class ProvincesService {
  #http = new Http();

  async getProvinces() {
    const resp = await this.#http.get(`${SERVER}/provinces`);
    return resp.provinces;
  }

  async getTowns(idProvince){
    const resp = await this.#http.get(`${SERVER}/provinces/${idProvince}/towns`);
    return resp.province;
  }
}

const service = new ProvincesService();

const provinces12 = await service.getProvinces();

console.log(provinces12);