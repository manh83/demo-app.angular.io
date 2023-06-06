import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  userForm!: FormGroup;
  constructor(private http: HttpClient,private formBuilder:FormBuilder) {
    this.userForm = this.formBuilder.group({
      email:  ['', [Validators.required, Validators.email]]
    });
  }
  get formControls(){
    return this.userForm.controls
  }
  onSubmit(): void {
    const checkEmail = {
      email: this.formControls['email'].value.trim(),
    }
  
    this.http.post<any>('http://localhost:8080/api/forgot-password', checkEmail).subscribe(
      (response) => {
          // Mật khẩu đã được gửi về thành công
          const newPassword = response.newPassword;
          Swal.fire('Success', `Mật khẩu của bạn là: ${newPassword}`, 'success');
        console.log(response);
      },
      (error) => {
        // Xử lý lỗi khi gửi yêu cầu
        console.log(error);
        Swal.fire('Error', error.error.message, 'error');
      }
    );
  }
}
