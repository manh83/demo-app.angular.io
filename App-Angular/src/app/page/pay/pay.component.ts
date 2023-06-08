import { Component, OnInit } from '@angular/core';
import { PayService } from 'src/app/services/pay.service';

interface CartProduct {
  product: any;
  quantity: number;
  total: number;
  selected: boolean;
}

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  selectedProducts: CartProduct[] = [];
  totalPrice:number = 0

  constructor(private payService: PayService) {}

  ngOnInit() {
    this.getSelectedProducts();
    this.calculateTotalPrice()
  }

  getSelectedProducts() {
    this.selectedProducts = this.payService.getSelectedProducts();
  }
  calculateTotalPrice() {
    this.totalPrice = this.selectedProducts.reduce((total, product) => {
      return total + (product.quantity * product.product.price);
    }, 0);
  }
}

