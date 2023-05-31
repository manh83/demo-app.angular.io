import { Component } from '@angular/core';
import { ICategory } from 'src/app/interface/interface';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
categories: ICategory[] = []
constructor(private categoryService: CategoryService){
  this.categoryService.getAllCategory().subscribe(
    (data)=>{
      this.categories = data
      console.log(data);
    },
    (error)=>{
      console.log("Không có sản phẩm nào: ",error);
    }
  )
}

  removeCategory(id:any):void{
    this.categoryService.deleteCategory(id).subscribe(()=>{
        this.categories = this.categories.filter((cate)=>cate._id != id)
    }
    )
  }
}
