import { Component } from '@angular/core';
import { IUser } from 'src/app/interface/interface';
import { FormBuilder,FormGroup,Validators  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
      userForm: FormGroup;
      constructor(private formBuilder: FormBuilder, private http: HttpClient) {
        this.userForm = this.formBuilder.group({
          username: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
        }, { validator: this.passwordMatchValidator });
      }

      passwordMatchValidator(formGroup: FormGroup) {
        if (formGroup && formGroup.get('password') && formGroup.get('confirmPassword')) {
          const password = formGroup.get('password')?.value;
          const confirmPassword = formGroup.get('confirmPassword')?.value;
      
          if (password !== confirmPassword) {
            formGroup.get('confirmPassword')?.setErrors({ 'passwordMismatch': true });
          } else {
            formGroup.get('confirmPassword')?.setErrors(null);
          }
        }
      }
      
      onSubmit() {
        if (this.userForm.valid) {
          const newUser: IUser = this.userForm.value;
          const api = 'http://localhost:3000/users'
          this.http.post(api, newUser).subscribe(
          response => {
            console.log('User added successfully:', response);
            this.userForm.reset();
          },
          error => {
            console.error('Error occurred while adding user:', error);
          }
         );
        }
      }
}
