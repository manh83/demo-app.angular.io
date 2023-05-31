import { Component, OnInit } from '@angular/core';
import { ICategory, IProduct } from 'src/app/interface/interface';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent{
  products:IProduct[] = []
  categories: ICategory[] = []
  constructor(private productService: ProductService,private categoryService: CategoryService) { 
    // mục category
    this.categoryService.getAllCategory().subscribe(
      (data: any) => {
        this.categories = data;
      },
      error => {
        console.log(error);
      }
    );

      // mục dữ liệu của products
    this.productService.getAllProduct().subscribe(
      (data:any) => {
      this.products = data.docs
    },
    error => {
      console.log(error);
    }
    )
  }
  // lấy ra tên của category thay vì lấy ra id
  getCategoryName(categoryId: any): string {
    const category = this.categories.find(c => c._id === categoryId);
    return category ? category.name : '';
  }

  // xóa sản phẩm
  removeProduct(id:any){
    this.productService.deleteProduct(id).subscribe(() => {
      this.products =this.products.filter(product => product._id != id)
    })
  }

}
