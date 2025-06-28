import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements AfterViewInit {
  // AfterViewInit = ist ein Lifecycle-Hook in Angular - wird einmal aufgerufen, nachdem die View des Components vollständig initialisiert wurde
  private routerEventsSub!: Subscription;
  
  constructor(private router: Router) {}

  scrollToTop(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
    this.closeNavbar();
  }

  closeNavbar(): void {
    const collapse = document.getElementById('navbarNavDropdown');
    if (collapse?.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(collapse) || new bootstrap.Collapse(collapse);
      bsCollapse.hide();
    }
  }

  toggleNavbar(): void {
    const toggler = document.getElementById('navbarToggler');
    const collapse = document.getElementById('navbarNavDropdown');
    if (toggler && collapse) {
      const isShown = collapse.classList.contains('show');
      const bsCollapse = bootstrap.Collapse.getInstance(collapse) || new bootstrap.Collapse(collapse);
      isShown ? bsCollapse.hide() : bsCollapse.show();
    }
  }

  ngAfterViewInit(): void {
    this.setupToggler();

    this.routerEventsSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => this.setupToggler(), 50);
      }
    });
  }

  setupToggler(): void {
    const toggler = document.getElementById('navbarToggler');
    if (toggler) {
      toggler.onclick = () => this.toggleNavbar();
    }
  }

  ngOnDestroy(): void {
    if (this.routerEventsSub) {
      this.routerEventsSub.unsubscribe();
    }
  }
}