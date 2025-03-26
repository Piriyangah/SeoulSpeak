import { Component, computed, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../shared/backend.service';
import { User } from '../../shared/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private auth = inject(BackendService);
  private router = inject(Router);

  loggedIn: Signal<boolean> = computed(() => this.auth.loggedIn());
  user: Signal<User> = computed(() => this.auth.user());

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  logout(): void {
    this.auth.unsetUser(); // Remove user's session info
    this.router.navigate(['/']); // Redirect after logout
  }
}