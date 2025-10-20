export class PropertyFilters {
  seller: number;
  province: number;
  search: string;
  sold: boolean;
  page: number;

  constructor(province = 0, search: string = '', sold = false, page = 1) {
    this.province = province;
    this.search = search;
    this.sold = sold;
    this.page = page;
  }
}
