import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartProducts: any[] = [];
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.getCartProducts();
  }

  getCartProducts() {
    this.cartService.getAllCart().subscribe(
      (response) => {
        console.log(response);
        this.cartProducts = response.cart;
      },
      (error) => {
        // Xử lý lỗi, ví dụ hiển thị thông báo lỗi.
        console.log(error);
      }
    );
  }
  removeCart(id:any){
    Swal.fire({
      text: 'Bạn có chắc chắn muốn xóa không?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result)=>{
      if(result.isConfirmed){
        this.cartService.deleleCart(id).subscribe(()=>{
          this.cartProducts = this.cartProducts.filter(cart=>cart._id !== id)
          Swal.fire("Success","Xóa sản phẩm thành công","success")
        })
      }
    })
  }
}
