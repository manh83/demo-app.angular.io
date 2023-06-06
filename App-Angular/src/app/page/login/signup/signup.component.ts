import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators,AbstractControl } from '@angular/forms';
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
    },{ validator: this.checkPassword});
  }
  

  get formControls() {
    return this.userForm.controls;
  }

  checkPassword(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ 'passwordMismatch': true });
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onHandleSubmit(): void {
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
