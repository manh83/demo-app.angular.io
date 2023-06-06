import { Component } from '@angular/core';
import { AuthuService } from 'src/app/services/authu.service';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interface/interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  searchKeyword: string = '';
  isMenuOpen: boolean = false;
  currentPage: number = 1;
  category:ICategory[] = []

  toggleMenu(): void {
  this.isMenuOpen = !this.isMenuOpen;
}

  constructor(private authService: AuthuService,private router: Router,private categoryService:CategoryService) {
    this.categoryService.getAllCategory().subscribe(
      (data)=>{
        this.category = data;
      }
    )
    this.isLoggedIn = authService.isLoggedIn();
    this
  }
  onSubmit(): void {
    this.router.navigate(['/'], { queryParams: { page: this.currentPage, search: this.searchKeyword || null } });

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
