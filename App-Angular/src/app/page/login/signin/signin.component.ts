import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthuService } from 'src/app/services/authu.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private authService: AuthuService,private router:Router) {}

  onLogin(): void {
    const userData = {
      email: this.email,
      password: this.password
    };
  
    this.http.post<any>('http://localhost:8080/api/signin', userData).subscribe(
      (response) => {
        // Xác thực thành công, điều hướng đến trang chính
        // const token = response.accessToken
        if(response.user.role==="admin"){
          // Lưu thông tin người dùng đã đăng nhập vào AuthService
          this.authService.setCurrentUser(response.user,response.accessToken);
          Swal.fire('Success', 'Đăng nhập thành công', 'success');
          this.router.navigate(['/admin/products/list']);
        }else{
          // Lưu thông tin người dùng đã đăng nhập vào AuthService
          this.authService.setCurrentUser(response.user,response.accessToken);
          Swal.fire('Success', 'Đăng nhập thành công', 'success');
          this.router.navigate(['']);
        }
      },
      (error) => {
        // Xác thực thất bại, hiển thị thông báo lỗi hoặc xử lý khác
        console.log('Đăng nhập thất bại', error);

        // kiểm tra lỗi khi server trả về và hiển thị thông báo lỗi
        if(error.status===400){
          Swal.fire('Error', error.error.message[0], 'error');
        }else if (error.status === 401) {
            Swal.fire('Error', error.error.message, 'error');
        }else if (error.status === 404) {
            Swal.fire('Error', error.error.message, 'error');
        }else {
            Swal.fire('Error', 'Đăng nhập thất bại', 'error');
        }
      }
    );
  }
  
}
