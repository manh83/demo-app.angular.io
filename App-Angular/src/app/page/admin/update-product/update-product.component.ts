import { Component } from '@angular/core';
import { IProduct } from 'src/app/interface/interface';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  product:IProduct = {
    name: "",
    price: 0,
    description: "",
    imgUrl: "",
    categoryId: ""
  }
  constructor (private productService:ProductService , private router:ActivatedRoute,private routerNavigate:Router) {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.productService.getOne(id).subscribe((data: any) => {
          this.product = data;
          console.log(this.product);
        });
      }
    });
  }
  
  
  onHandleSubmit():void{
    this.productService.updateProduct(this.product).subscribe(
      product => {
      // console.log(product);
      Swal.fire("Success","Cập nhật sản phẩm thành công!","success").then(()=>{
        this.routerNavigate.navigate(['/admin/products/list'])
      })
     },
     error => {
        console.log(error);
     }
     )
  }
}
