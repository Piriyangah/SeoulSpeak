import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, inject, signal, computed, Signal } from '@angular/core';
import { BackendService } from '../../shared/backend.service';
import { User } from '../../shared/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen = false;
  isMobile = false;
  private routerEventsSub!: Subscription;

  private backend = inject(BackendService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
    document.addEventListener('click', this.handleClickOutside.bind(this));

    this.routerEventsSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuOpen = false;
      }
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
    document.removeEventListener('click', this.handleClickOutside.bind(this));
    this.routerEventsSub?.unsubscribe();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  onHover(hovering: boolean): void {
    if (!this.isMobile) {
      this.menuOpen = hovering;
    }
  }

  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isClickInsideMenu = target.closest('.mobile-menu-wrapper') !== null;
    const isBurger = target.closest('.burger') !== null;

    if (!isClickInsideMenu && !isBurger) {
      this.menuOpen = false;
    }
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  user = this.backend.user;
  
  loggedIn(): boolean {
    return this.backend.loggedIn();
  }

  logout(): void {
    //localStorage.removeItem('token');
    //localStorage.removeItem('user');

    //const cancelBtn = document.getElementById('cancelLogoutBtn');
    //cancelBtn?.click();

    this.backend.unsetUser();
    document.getElementById('cancelLogoutBtn')?.click();
    this.router.navigate(['/']);
  }

}