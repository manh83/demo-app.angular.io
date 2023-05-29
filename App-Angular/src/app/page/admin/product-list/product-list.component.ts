import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interface/interface';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent{
  products:IProduct[] = []
  constructor(private productService: ProductService) { 
    this.productService.getAllProduct().subscribe(products => {
      this.products = products
    },
    error => {
      console.log(error);
    }
    )
  }
  removeProduct(id:any){
    this.productService.deleteProduct(id).subscribe(() => {
      this.products =this.products.filter(product => product.id != id)
    })
  }

}
