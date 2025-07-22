import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

<<<<<<< HEAD
declare var bootstrap: any;
// Login_New
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BackendService } from '../../shared/backend.service';

=======
>>>>>>> origin/main
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  menuOpen = false;
  private routerEventsSub!: Subscription;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(): void {
    this.routerEventsSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuOpen = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSub?.unsubscribe();
  }
}
<<<<<<< HEAD
// Login_New
  private auth = inject(BackendService);
  private router = inject(Router);
  
  isAdmin(): boolean {
    return this.auth.isAdmin();
  }
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
=======
>>>>>>> origin/main
