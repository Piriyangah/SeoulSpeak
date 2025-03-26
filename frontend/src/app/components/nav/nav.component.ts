import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  private auth = inject(BackendService);
  private router = inject(Router);
  
  isAdmin(): boolean {
    return this.auth.isAdmin();
  }
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
