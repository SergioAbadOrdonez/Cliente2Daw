import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Product } from '../interfaces/product';
import { JsonPipe, NgClass } from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'products-page',
  imports: [NgClass,FormsModule,JsonPipe],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {
  title = 'Mi lista de productos';
  showImage = true;

  toggleImage() {
    this.showImage = !this.showImage;
  }

  products: Product[] = [
    {
      id: 1,
      description: 'SSD hard drive',
      available: '2016-10-03',
      price: 75,
      imageUrl: 'ssd.jpg',
      rating: 5,
    },
    {
      id: 2,
      description: 'LGA1151 Motherboard',
      available: '2016-09-15',
      price: 96.95,
      imageUrl: 'motherboard.jpg',
      rating: 4,
    },
    {
      id: 3,
      description: 'hdd hard drive',
      available: '2016-09-15',
      price: 76.95,
      imageUrl: 'hdd.jpg',
      rating: 5,
    },
    {
      id: 4,
      description: 'Ram memory',
      available: '2016-09-15',
      price: 10000.95,
      imageUrl: 'ram.jpg',
      rating: 5,
    },
  ];
  newProduct!: Product;
  fileName = '';

  #changeDetector = inject(ChangeDetectorRef); // Necessary in new Angular zoneless apps

  constructor() {
    this.resetProduct();
  }

  changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files?.length) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newProduct.imageUrl = reader.result as string;
      this.#changeDetector.markForCheck(); // Necessary in new Angular zoneless apps
    });
  }

  addProduct() {
    this.newProduct.id = Math.max(...this.products.map(p => p.id!)) + 1;
    this.products.push(this.newProduct);
    this.fileName = '';
    this.resetProduct();
  }

  private resetProduct() {
    this.newProduct = {
      id: 0,
      description: '',
      available: '',
      imageUrl: '',
      rating: 1,
      price: 0
    };
    this.fileName = '';
  }
}
