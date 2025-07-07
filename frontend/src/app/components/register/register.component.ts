import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../shared/user';
import { MatIconModule } from '@angular/material/icon';
import { BackendService } from '../../shared/backend.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';

export interface DialogData {
  headline: string;
  info: string;
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class RegisterComponent {
  private backend = inject(BackendService)
  public dialog = inject(MatDialog)
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required)
  });

  roles = [ "admin", "user"];
  hide = true;
  hide2 = true;
  user!: User;

  valid(): boolean {
    const check = 
    !this.registerForm.controls['username'].hasError('required') &&
    !this.registerForm.controls['password'].hasError('required') &&
    !this.registerForm.controls['password'].hasError('minlength') &&
    !this.registerForm.controls['password2'].hasError('required') &&
    !this.registerForm.controls['password2'].hasError('minlength') &&
    !this.registerForm.controls['email'].hasError('required') &&
    !this.registerForm.controls['email'].hasError('email') &&
    this.registerForm.value.password == this.registerForm.value.password2;
    console.log('valid : ', check)
    return check;
  }

  differentPassword(): boolean {
    const check = this.registerForm.dirty && this.registerForm.value.password != this.registerForm.value.password2;
    if(check) {
      this.registerForm.controls.password2.setErrors({'incorrect': true});
    } else {
      this.registerForm.controls.password2.setErrors({'incorrect': false});
    }
    console.log('check : ', check)
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
    console.log(this.user)
    if(this.valid()) {
      console.log('eingaben gueltig! Registrierung wird vorgenommen')
      this.backend.registerUser(this.user).subscribe({
        next: (response) => {
          console.log('response', response);
          this.openDialog({ headline: "Erfolg", info: "User " + response.username + " registriert!" });
        },
        error: (err) => {
          console.log('HttpErrorResponse : ', err);
          this.openDialog({ headline: "Fehler", info: "username und/oder E-Mail existiert bereits" });
        },
        complete: () => console.log('register completed')
    });
    } else {
      console.log('eingaben ungueltig! Registrierung wird abgelehnt')
    }
  }

  openDialog(data: DialogData) {
    this.dialog.open(ConfirmComponent, { data: data });
  }
}