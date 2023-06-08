import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PayService } from 'src/app/services/pay.service';
import {FormGroup} from "@angular/forms"

interface CartProduct {
  product: any;
  quantity: number;
  total: number;
  selected: boolean;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartProducts: CartProduct[] = [];
  totalPrice: number = 0; // Biến lưu tổng giá tiền
  selectAll: boolean = false; // Biến lưu trạng thái chọn tất cả
  userInfoForm!: FormGroup;
  constructor(private cartService: CartService,private router:Router,private payService:PayService) {}

  ngOnInit() {
    this.getCartProducts();
  }


  getCartProducts() {
    this.cartService.getAllCart().subscribe(
      (response) => {
        console.log(response);
        this.cartProducts = response.cart.map((cartItem: any) => ({
          product: cartItem,
          quantity: 1,
          total: cartItem.price,
          selected: false
        }));
        this.calculateTotal(); // Gọi phương thức calculateTotal() sau khi cập nhật cartProducts
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectProduct(cartItem: CartProduct, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    cartItem.selected = checkbox.checked;
    this.calculateTotal();
  }
  

  selectAllProducts() {
    this.cartProducts.forEach((cartItem) => {
      cartItem.selected = this.selectAll;
    });
    this.calculateTotal();
  }
  

  calculateTotal() {
    this.totalPrice = 0; // Đặt giá trị ban đầu của tổng giá tiền là 0

    this.cartProducts.forEach((cartItem) => {
      if (cartItem.selected) {
        cartItem.total = cartItem.product.price * cartItem.quantity;
        this.totalPrice += cartItem.total; // Cộng giá tiền của sản phẩm vào tổng giá tiền
      } else {
        cartItem.total = cartItem.product.price; // Giữ nguyên giá trị total ban đầu
      }
    });

    return this.totalPrice; // Trả về tổng giá tiền
  }

  minus(cartItem: CartProduct) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      if (cartItem.selected) {
        cartItem.total = cartItem.product.price * cartItem.quantity;
      }
      this.calculateTotal(); // Gọi phương thức calculateTotal() sau khi số lượng thay đổi
    }
  }

  plus(cartItem: CartProduct) {
    cartItem.quantity++;
    if (cartItem.selected) {
      cartItem.total = cartItem.product.price * cartItem.quantity;
    }
    this.calculateTotal(); // Gọi phương thức calculateTotal() sau khi số lượng thay đổi
  }

  removeCart(id: any) {
    Swal.fire({
      text: 'Bạn có chắc chắn muốn xóa không?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.deleleCart(id).subscribe(() => {
          this.cartProducts = this.cartProducts.filter(
            (cart: CartProduct) => cart.product._id !== id
          );
          Swal.fire('Success', 'Xóa sản phẩm thành công', 'success');
        });
      }
    });
  }

  removeSelectedProducts() {
    const selectedProducts = this.cartProducts.filter((cartItem) => cartItem.selected);
    if (selectedProducts.length === 0) {
      return;
    }
  
    Swal.fire({
      text: 'Bạn có chắc chắn muốn xóa các sản phẩm đã chọn?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedProductIds = selectedProducts.map((cartItem) => cartItem.product._id);
        this.cartService.deleteAllCart().subscribe(() => {
          this.cartProducts = this.cartProducts.filter(
            (cartItem) => !selectedProductIds.includes(cartItem.product._id)
          );
          Swal.fire('Success', 'Xóa sản phẩm thành công', 'success');
          this.calculateTotal(); // Tính lại tổng giá tiền sau khi xóa sản phẩm
        });
      }
    });
  }
  

  // Thanh toán
  goToPayment() {
    // Get the selected products
    const selectedProducts = this.cartProducts.filter((cartItem) => cartItem.selected);
    
    // Set the selected products in the PayService
    this.payService.setSelectedProducts(selectedProducts);
    
    // Navigate to the payment page
    this.router.navigate(['/pay']);
  }
  
}
