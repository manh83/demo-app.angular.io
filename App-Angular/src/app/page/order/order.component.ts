import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getAllOrder().subscribe(
      (response: any) => {
        this.orders = response.orders;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeOrder(id:any){
    Swal.fire({
      text: 'Bạn có chắc chắn muốn xóa không?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result)=>{
      if(result.isConfirmed){
        this.orderService.deleteOrder(id).subscribe(()=>{
          this.orders = this.orders.filter((order)=>order._id !== id)
          Swal.fire("Success","Hủy đơn hàng thành công","success")
        })
      }
    })
  }
}
