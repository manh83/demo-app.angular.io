import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayService } from 'src/app/services/pay.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { OrderService } from 'src/app/services/order.service';

interface CartProduct {
  product: any,
  quantity: number,
  total: number,
  selected: boolean,
}

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  selectedProducts: CartProduct[] = [];
  totalPrice: number = 0;

  constructor(
    private payService: PayService,
    private router: Router,
    private http: HttpClient,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.getSelectedProducts();
    this.calculateTotalPrice();
  }

  getSelectedProducts() {
    this.selectedProducts = this.payService.getSelectedProducts();
    console.log(this.selectedProducts);
  }

  calculateTotalPrice() {
    this.totalPrice = this.selectedProducts.reduce((total, product) => {
      return total + product.total;
    }, 0);
  }

  createOrder() {
    const orderData = this.selectedProducts.map((product) => {
      return {
        productId: product.product._id,
        quantity: product.quantity,
        totalPrice: product.total
      };
    });
  
    this.orderService.addOrder(orderData).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Thanh toán thành công',
          text: 'Đơn hàng đã được tạo'
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không thể tạo đơn hàng'
        });
      }
    );
  }
}
