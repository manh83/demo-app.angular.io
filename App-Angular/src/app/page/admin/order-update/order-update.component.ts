import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from 'src/app/interface/interface';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent {
  order: IOrder= {
    status: "",
  }
  constructor (private orderService:OrderService , private router:ActivatedRoute,private routerNavigate:Router) {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.orderService.getOneOrder(id).subscribe((data: any) => {
          this.order = data;
          console.log(data);
          
        });
      }
    });
  }
  
  
  onHandleSubmit():void{
    this.orderService.updateOrder(this.order).subscribe(
      (order:any) => {
      console.log(order);
      Swal.fire("Success","Cập nhật sản phẩm thành công!","success")
     },
     error => {
        console.log(error);
     }
     )
  }
}
