import { Component, effect, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsDetailStateService } from '../data.access/product-detail-state.service'

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styles: ``,
  providers:[ProductsDetailStateService]
})
export default class ProductDetailComponent {
  productDetailState = inject(ProductsDetailStateService).state;
  id= input.required<string>();
  constructor() {
    effect(()=> {
      this.productDetailState.getById(this.id())
    })
  }

}
