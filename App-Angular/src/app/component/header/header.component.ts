import { Component, OnInit } from '@angular/core';
import { AuthuService } from 'src/app/services/authu.service';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interface/interface';
import { CategoryService } from 'src/app/services/category.service';
import { CartService } from 'src/app/services/cart.service';

interface CartProduct {
  product: any;
  quantity: number;
  total: number;
  selected: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  searchKeyword: string = '';
  isMenuOpen: boolean = false;
  currentPage: number = 1;
  category: ICategory[] = [];
  cartProducts: CartProduct[] = [];
  cartCount: number = 0; // Variable to hold the cart count

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(
    private authService: AuthuService,
    private router: Router,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.fetchCartProducts(); // Fetch the cart products initially
  }

  fetchCartProducts(): void {
    this.cartService.getAllCart().subscribe(
      (response) => {
        if (response && response.cart && response.cart.length > 0) {
          this.cartProducts = response.cart; // Update the cart products array
          this.cartCount = this.cartProducts.length; // Update the cart count
        } else {
          this.cartProducts = []; // Empty the cart products array
          this.cartCount = 0; // Set the cart count to 0
        }
      },
      (error) => {
        console.log(error);
      }
    );
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
