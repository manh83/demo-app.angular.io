import { Component,Renderer2  } from '@angular/core';
import { ICategory } from 'src/app/interface/interface';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from "@angular/forms"

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  productForm!:FormGroup
  categories: ICategory[] = []
  imgUrl!: string
  selectedFile!: File;
  UPLOAD_PRESET = "uploadFile"
  CLOUD_NAME = "dajtruy2v"

  constructor(private categoryService: CategoryService,private productService: ProductService,
    private http: HttpClient,private router: Router,private formBuilder:FormBuilder){
      this.productForm = this.formBuilder.group({
        name: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(255)]],
        price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
        imgUrl: [''],
        description: [''],
        categoryId: ['',[Validators.required]]
      })
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

   get formControls(){
    return this.productForm.controls
   }

  onHandleChange(event: any): void {
    this.selectedFile = event.target.files[0]
    const reader = new FileReader();

  reader.onload = (e: any) => {
    this.imgUrl = e.target.result;
  };

  reader.readAsDataURL(this.selectedFile);
  }

  onSubmit(): void {
    const formData:FormData = new FormData()
    formData.append("file",this.selectedFile)
    formData.append("upload_preset",this.UPLOAD_PRESET)
     this.http.post(`https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`,formData).subscribe(
        (data:any)=>{
          const imgUrl = data.secure_url
          const linkImgUrl = imgUrl
          this.productService.addProduct({
            ...this.productForm.value,
            imgUrl:linkImgUrl
          }).subscribe((data)=>{
            // console.log(data);
            Swal.fire("Success","Thêm sản phẩm thành công","success")
            .then(()=>{
              this.router.navigate(['/admin/products/list'])
            })
          },
          (error) => {
            Swal.fire('Lỗi', error.error.message, 'error'); // Hiển thị thông báo lỗi từ server
            console.log(error);
          }
          )
        },
        (error)=>{
          console.log("Lỗi khi tải ảnh lên: ",error);
          Swal.fire("Error","Bạn phải nhập đầy đủ thông tin để thực hiện chức năng","error")
        }
     )

  }
}
