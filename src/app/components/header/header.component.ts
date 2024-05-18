import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  navbarOpen = false;

  constructor(private authService: AuthenticationService) {}

  signout() {
    this.authService.signout();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
