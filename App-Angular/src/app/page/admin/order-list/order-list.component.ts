import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit{
  orders: any[] = [];

  constructor(private orderService: OrderService,private router:Router) {}

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

  edit(id:any){
    Swal.fire({
      text: 'Bạn có chắc chắn muốn sửa không?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel'
    }).then((result)=>{
      if(result.isConfirmed){
        this.router.navigate([`/admin/order/${id}`])
      }
    })
  }
}
