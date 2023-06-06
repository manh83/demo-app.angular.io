import { Component, ViewChild } from '@angular/core';
import {FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthuService } from 'src/app/services/authu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  userForm!:FormGroup
  constructor(private authService: AuthuService, private formBuilder: FormBuilder) { 
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]]
    });
  }
  
  get formControls(){
    return this.userForm.controls
  }
  onHandleChangePassword() {
    const passwordData = {
      email: this.userForm.get('email')?.value.trim(),
      password: this.userForm.get('password')?.value.trim(),
      newPassword: this.userForm.get('newPassword')?.value.trim()
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

