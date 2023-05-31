import { Component } from '@angular/core';
import { AuthuService } from 'src/app/services/authu.service';
import { IUser } from 'src/app/interface/interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public authService: AuthuService) {}

  getUsername(): string | null {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.name : null;
  }
}
