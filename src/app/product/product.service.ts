import { Injectable } from "@angular/core";
import { BaseService } from "@app-core/services/base.service";
import { environment } from '../../environments/environment';
import { ProductItem } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = `${environment.api_url}`;

  userCredentials: any;

  constructor(
    private baseService: BaseService,
  ) { }

  checkoutProduct(item: ProductItem) {
    const url = `${this.baseUrl}/checkout`;
    return this.baseService.post<ProductItem>(url, item);
  }

}

