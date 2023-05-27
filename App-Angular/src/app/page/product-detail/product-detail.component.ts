import { Component } from '@angular/core';
import { IProduct } from 'src/app/interface/interface';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
product: IProduct | undefined

constructor (
  private router: ActivatedRoute,
  private productService: ProductService
) {
  this.router.paramMap.subscribe(params => {
    const id = Number(params.get("id"))
    this.productService.getOne(id).subscribe(
      (product) => {
        this.product = product
      },
      (error) => {
        console.log(error);
        this.product = undefined
      }
    )
  })
}
}
