import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
      confirmPassword: ['', Validators.required]
    });
  }
  

  get formControls() {
    return this.userForm.controls;
  }

  onHandleSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }
    const trimmedValues = {
      name: this.formControls['name'].value.trim(),
      email: this.formControls['email'].value.trim(),
      password: this.formControls['password'].value.trim(),
      confirmPassword: this.formControls['confirmPassword'].value.trim()
    };


    this.userService.createUser(trimmedValues).subscribe(
      (data) => {
        Swal.fire("Success", "Đăng ký thành công", "success");
      },
      (err) => {
        Swal.fire("Error", "Đăng ký không thành công", "error");
        console.log(err);
      }
    );
  }
}
