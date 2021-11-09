import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxStripeModule } from 'ngx-stripe';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { environment
 } from 'environments/environment';
import { ProductService } from './product.service';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: 'success', component: SuccessComponent },
  {
    path: '',
    component: ProductComponent
  }
];

@NgModule({
  declarations: [ProductComponent, CheckoutComponent, SuccessComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.key),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [ProductService]
})
export class ProductModule { }
