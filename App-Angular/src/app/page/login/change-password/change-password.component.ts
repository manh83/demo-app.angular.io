import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthuService } from 'src/app/services/authu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  public email!: string;
  public password!: string;
  public newPassword!: string;
  @ViewChild('changePasswordForm') changePasswordForm!: NgForm;

  constructor(private authService: AuthuService) { }

  changePassword() {
    if (this.changePasswordForm.valid) {
      const passwordData = {
        email: this.email,
        password: this.password,
        newPassword: this.newPassword
      };

      this.authService.changePassword(passwordData).subscribe(
        (response) => {
          Swal.fire('Success', `Đổi mật khẩu thành công`, 'success');
          // console.log(response);
        },
        (error) => {
          console.error(error);
          Swal.fire('Error', error.error.message, 'error');
        }
      );
    }
  }
}
