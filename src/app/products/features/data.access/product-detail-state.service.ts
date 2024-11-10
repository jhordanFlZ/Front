import { inject, Injectable } from "@angular/core";
import { Product } from "../../../interfaces/product.interface";
import {signalSlice} from 'ngxtension/signal-slice';
import { ProductService } from "./products.service";
import { catchError, map, Observable, of, startWith, Subject, switchMap } from "rxjs";
interface state{
    products: Product | null;
    status: 'loading'| 'success' | 'error';
    
}
@Injectable()
export class ProductsDetailStateService {
    private productService = inject(ProductService);
    private initialState: state = {
        products: null,
        status: 'loading' as const,
     
    };
    
    state = signalSlice({
        initialState: this.initialState,
        actionSources: {
            getById: (_state, $: Observable<string>) => $.pipe(
                switchMap((id)=> this.productService.getProduct(id)),
                map((data) => ({product:data, status:'success' as const})),
            )
        }
            
        
    });
}