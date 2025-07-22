import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/user';
import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RegisterComponent {
  constructor(private backend: BackendService) {}

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required)
  });

  roles = ['admin', 'user'];
  hide = true;
  hide2 = true;
  user!: User;
  message: string | null = null;
  success: boolean = true;

  valid(): boolean {
    const check =
      !this.registerForm.controls['username'].hasError('required') &&
      !this.registerForm.controls['password'].hasError('required') &&
      !this.registerForm.controls['password'].hasError('minlength') &&
      !this.registerForm.controls['password2'].hasError('required') &&
      !this.registerForm.controls['password2'].hasError('minlength') &&
      !this.registerForm.controls['email'].hasError('required') &&
      !this.registerForm.controls['email'].hasError('email') &&
      this.registerForm.value.password === this.registerForm.value.password2;

    return check;
  }

  differentPassword(): boolean {
    const check = this.registerForm.dirty && this.registerForm.value.password !== this.registerForm.value.password2;
    if (check) {
      this.registerForm.controls.password2.setErrors({ incorrect: true });
    } else {
      this.registerForm.controls.password2.setErrors(null);
    }
    return check;
  }

  onSubmit(): void {
    const values = this.registerForm.value;
    this.user = {
      username: values.username!,
      password: values.password!,
      email: values.email!,
      role: values.role!
    };

    if (this.valid()) {
      this.backend.registerUser(this.user).subscribe({
        next: (response) => {
          this.success = true;
          this.message = `✅ User "${response.username}" erfolgreich registriert.`;
          this.registerForm.reset();
        },
        error: (err) => {
          this.success = false;
          this.message = `❌ Fehler: Benutzername oder E-Mail bereits vergeben.`;
        }
      });
    } else {
      this.success = false;
      this.message = `❌ Ungültige Eingaben. Bitte überprüfen.`;
    }
  }
}