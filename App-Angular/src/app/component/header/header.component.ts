import { Component } from '@angular/core';
import { AuthuService } from 'src/app/services/authu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthuService) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  getUsername(): string {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.name : '';
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
