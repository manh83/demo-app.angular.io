import { Component } from '@angular/core';
import { IProduct } from 'src/app/interface/interface';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
   product: IProduct = {
    name: "",
    price: 0,
    desc: "",
    imgUrl: ""
  }
  selectedFile!: File;
  UPLOAD_PRESET = "uploadFile"
  CLOUD_NAME = "dajtruy2v"

  constructor(private productService: ProductService,private http: HttpClient){ }

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
