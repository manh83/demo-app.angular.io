import { Component,OnInit } from '@angular/core';
import { IProduct } from 'src/app/interface/interface';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
products: IProduct[] = []
constructor (private productService:ProductService) {}

ngOnInit(): void {
  this.productService.getAllProduct().subscribe(
    (data:any) => {
      this.products = data.docs;
      console.log(data);
    },
    (error)=>{
      console.log(error);
    }
  )
}
}
