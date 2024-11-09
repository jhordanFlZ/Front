
import {  Injectable } from "@angular/core";
import { BaseHttpService } from "../../../data-access/base-http.service";
import { map, Observable } from "rxjs";
import { Product } from "../../../interfaces/product.interface";

@Injectable({providedIn:'root' })
export class ProductService extends BaseHttpService {
    
    getProducts(): Observable<Product[]>{
    return this.http.get<any[]>(`${this.apiUrl}/products`);
    }
}