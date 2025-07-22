import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/user';
import { BackendService } from '../../shared/backend.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})

export class RegisterComponent {
  constructor(private backend: BackendService, private router: Router) {}

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
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
      !this.registerForm.controls['password2'].hasError('required') &&
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
    console.log('Formular abgeschickt', this.registerForm.value);
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
          this.message = `✅ Benutzer "${response.username}" wurde erfolgreich erstellt.`;
          this.registerForm.reset();
        },
        error: (err) => {
          this.success = false;
          this.message = `❌ Fehler: ${err.error.message || 'Unbekannter Fehler'}`;
        }
      });
    } else {
      this.success = false;
      this.message = `❌ Ungültige Eingaben. Bitte überprüfen.`;
    }
  }
}