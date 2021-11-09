import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { CheckoutComponent } from './checkout/checkout.component';
import { rubberShoes } from './product.mock';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  alertStatus: boolean = false;

  onSuccess: boolean;

  bsModalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private productService: ProductService,
    private http: HttpClient
  ) {}

  item = rubberShoes;

  ngOnInit(): void {
  }

  // strip token credit card
  checkoutModal() {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Checkout'
      }
    };

    this.bsModalRef = this.modalService.show(CheckoutComponent, initialState);
    this.bsModalRef.onHide?.subscribe(() => this.onSuccess = true);
  }

  stripeCheckout() {
    const item = {
      product_name: this.item.name,
      price: this.item.prize + this.item.shippingFee,
      quantity: 1
    };

    this.productService.checkoutProduct(item)
      .pipe().subscribe((res: any) => this.success(res.id));
  }

  success(id: string) {
    this.http.get(`http://localhost:3000/notification/order/success?session_id=${id}`)
      .pipe().subscribe(res => {
        if(res) {
          console.log(res);
        }
      });
  }
}
