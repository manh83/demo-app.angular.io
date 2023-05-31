import { Component } from '@angular/core';
import { ICategory } from 'src/app/interface/interface';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent {
  category: ICategory = {
    name: ""
  }
  constructor(private categoryService:CategoryService,private router: ActivatedRoute){
    this.router.paramMap.subscribe((params)=>{
        const id = params.get('id')
        if(id){
          this.categoryService.getOneCategory(id).subscribe(
            (data)=>{
              this.category = data
              // console.log(data);
            },
            (error) => {
              console.log("Không tìm thấy sản phẩm cần update: ",error);
            }
          )
        }
    })
  }

  onHandleSubmit():void{
    this.categoryService.updateCategory(this.category).subscribe(
      (data)=>{
        this.category = data
        // console.log(data);
      },
      (error)=>{
        console.log("Update lỗi: ",error);
      }
    )
  }
}
