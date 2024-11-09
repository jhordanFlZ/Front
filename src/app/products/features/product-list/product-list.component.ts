import { Component, inject } from '@angular/core';
import { ProductService } from '../data.access/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styles: ``
})
export default class ProductListComponent {
  private productsService = inject(ProductService);
  
}
