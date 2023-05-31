import { Component } from '@angular/core';
import { ICategory, IProduct } from 'src/app/interface/interface';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
   product: IProduct = {
    name: "",
    description: "",
    price: 0,
    imgUrl: "",
    categoryId: ""
  }
  categories: ICategory[] = []

  selectedFile!: File;
  UPLOAD_PRESET = "uploadFile"
  CLOUD_NAME = "dajtruy2v"

  constructor(private categoryService: CategoryService,private productService: ProductService,private http: HttpClient){
    this.categoryService.getAllCategory().subscribe(
      (categoryData)=>{
        this.categories = categoryData
        console.log(categoryData);
      },
      (error)=>{
        console.log(error);
      }
    )
   }

  onHandleChange(event: any): void {
    this.selectedFile = event.target.files[0]
  }

  onSubmit(): void {
    const formData:FormData = new FormData()
    formData.append("file",this.selectedFile)
    formData.append("upload_preset",this.UPLOAD_PRESET)
     this.http.post(`https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`,formData).subscribe(
        (data:any)=>{
          const imgUrl = data.secure_url
          this.product.imgUrl = imgUrl
          console.log(imgUrl);
          this.productService.addProduct(this.product).subscribe(
            (respone)=>{
              this.product = respone
              console.log(respone);
            },
            (error) => {
              console.log("Lỗi khi thêm sản phẩm: ",error);
            }
          )
        },
        (error)=>{
          console.log("Lỗi khi tải ảnh lên: ",error);
        }
     )

  }
}
