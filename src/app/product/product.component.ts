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


  bsModalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private productService: ProductService
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
  }

  stripeCheckout() {
    const item = {
      product_name: this.item.name,
      price: this.item.prize + this.item.shippingFee,
      quantity: 1
    };

    this.productService.checkoutProduct(item)
      .pipe().subscribe(res => console.log(res));
  }
}
