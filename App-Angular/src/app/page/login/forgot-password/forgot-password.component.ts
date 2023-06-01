import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private http: HttpClient) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const emailControl = this.forgotPasswordForm.get('email');
    if (emailControl && emailControl.value) {
      const email = emailControl.value;
      this.sendResetPasswordRequest(email);
    }
  }

  sendResetPasswordRequest(email: string): void {
    const requestBody = { email };
  
    this.http.post<any>('http://localhost:8080/api/forgot-password', requestBody).subscribe(
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
