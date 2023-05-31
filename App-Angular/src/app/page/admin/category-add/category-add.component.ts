import { Component } from '@angular/core';
import { ICategory } from 'src/app/interface/interface';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {
  category: ICategory = {
    name: ""
  }
  constructor(private categoryService: CategoryService){}
  onHandleSubmit():void{
    this.categoryService.addCategory(this.category).subscribe(
      (data)=>{
        this.category = data
        console.log(this.category);
      },
      (error)=>{
        console.log("Lỗi khi thêm category: ",error);
      }
    )
  }
}
