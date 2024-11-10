import { inject, Injectable } from "@angular/core";
import { Product } from "../../../interfaces/product.interface";
import {signalSlice} from 'ngxtension/signal-slice';
import { ProductService } from "./products.service";
import { catchError, map, of, startWith, Subject, switchMap } from "rxjs";
interface state{
    products: Product[];
    status: 'loading'| 'success' | 'error';
    page: number;
}
@Injectable()
export class ProductsStateService{
    private productService = inject(ProductService);
    private initialState: state = {
        products: [],
        status: 'loading' as const,
        page:1,
    };
    changepage$ = new Subject<number>();
    loadProducts$ = this.changepage$.pipe(
        startWith(1),
        switchMap((page)=> this.productService.getProducts(page)),
        map(products => ({products,status:'success'as const})),
        catchError(() => {
            return of({
                products:[],
                status:'error' as const,
            })
        })
    );
    
    state = signalSlice({
        initialState: this.initialState,
        sources: [
            this.changepage$.pipe(map((page)=> ({page, status: 'loading' as const}))),
            this.loadProducts$,
        ]
    });
}