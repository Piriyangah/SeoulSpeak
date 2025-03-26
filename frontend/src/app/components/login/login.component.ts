import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BackendService } from '../../shared/backend.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);
  private backend = inject(BackendService)
  private dialog = inject(MatDialog);
  errorMessage: string | null = null;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  hide = true;

  onSubmit(): void {
    const values = this.loginForm.value;
    const username = values.username!;
    const password =  values.password!;

    const user = {username: username, password: password}
    console.log('user', user)
    this.backend.loginUser(user).subscribe({
       next: (response) => {
          console.log('user logged in ',response);
          this.backend.setUser(response.token, response.user);
          this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('login error',err);
        this.errorMessage = 'Invalid username or password!';
      },
      complete: () => console.log('login completed')
    })
  }

  valid(): boolean {
    const check = 
    !this.loginForm.controls['username'].hasError('required') &&
    !this.loginForm.controls['password'].hasError('required') &&
    !this.loginForm.controls['password'].hasError('minlength')
    console.log('valid : ', check)
    return check;
  }
}