import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);
  private backend = inject(BackendService);
  errorMessage: string | null = null;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  hide = true;

  onSubmit(): void {
    const values = this.loginForm.value;
    const username = values.username!;
    const password = values.password!;

    const user = { username, password };
    console.log('user', user);

    this.backend.loginUser(user).subscribe({
      next: (response) => {
        console.log('user logged in', response);
        this.backend.setUser(response.token, response.user);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('login error', err);
        this.errorMessage = 'Invalid username or password!';
      },
      complete: () => console.log('login completed')
    });
  }

  valid(): boolean {
    const check =
      !this.loginForm.controls['username'].hasError('required') &&
      !this.loginForm.controls['password'].hasError('required') &&
      !this.loginForm.controls['password'].hasError('minlength');
    console.log('valid:', check);
    return check;
  }
}
