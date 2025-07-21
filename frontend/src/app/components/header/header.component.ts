import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  menuOpen = false;
  isMobile = false; 
  private routerEventsSub!: Subscription;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));

    // Outside click schließen
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

  // Wenn Maus über Menü ist (für Hover)
  onHover(hovering: boolean): void {
    if (!this.isMobile) {
      this.menuOpen = hovering;
    }
  }

  // Klick außerhalb => Menü schließen
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
}