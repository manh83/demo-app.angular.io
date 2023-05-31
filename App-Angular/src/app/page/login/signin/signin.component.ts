import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthuService } from 'src/app/services/authu.service';
import Swal from 'sweetalert2';
import { IUser } from 'src/app/interface/interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private authService: AuthuService) {}

  onLogin(): void {
    const userData = {
      email: this.email,
      password: this.password
    };
  
    this.http.post<any>('http://localhost:8080/api/signin', userData).subscribe(
      (response) => {
        // Xác thực thành công, điều hướng đến trang chính
        console.log('Đăng nhập thành công');
        // Lưu thông tin người dùng đã đăng nhập vào AuthService
        this.authService.setCurrentUser(response.user);
        // Hiển thị thông báo thành công
        Swal.fire('Success', 'Đăng nhập thành công', 'success');
      },
      (error) => {
        // Xác thực thất bại, hiển thị thông báo lỗi hoặc xử lý khác
        console.log('Đăng nhập thất bại', error);
  
        // Kiểm tra lỗi và hiển thị thông báo phù hợp
        if (error.error && error.error.message) {
          // Hiển thị thông báo lỗi từ phía server
          Swal.fire('Error', error.error.message, 'error');
        } else if (error.status === 404) {
          Swal.fire('Error', 'Email không tồn tại', 'error');
        } else if (error.status === 401) {
          Swal.fire('Error', 'Mật khẩu không đúng', 'error');
        } else {
          Swal.fire('Error', 'Đăng nhập thất bại', 'error');
        }
      }
    );
  }
  
}
