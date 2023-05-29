import { Component } from '@angular/core';
import { IProduct } from 'src/app/interface/interface';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  product:IProduct = {
    name: "",
    price: 0,
    desc: "",
    imgUrl: ""
  }
  constructor (private productService:ProductService , private router:ActivatedRoute) {
    this.router.paramMap.subscribe(param => {
      const id = Number(param.get('id'))
      this.productService.getOne(id).subscribe(product => {
        this.product = product
      })
    })
  }

  onHandleSubmit(){
    this.productService.updateProduct(this.product).subscribe(product => {
      console.log(product);
    })
  }
}
