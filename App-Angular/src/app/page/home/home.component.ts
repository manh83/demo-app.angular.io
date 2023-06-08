import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interface/interface';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 10;
  searchKeyword: string = '';
  filteredProducts: IProduct[] = [];

  constructor(private productService: ProductService,private route: ActivatedRoute,private cartService:CartService) {}

  addProductToCart(productId: any) {
    // Kiểm tra nếu productId không phải là undefined
    if (productId) {
      // Tiếp tục xử lý
      this.cartService.addToCart(productId).subscribe(
        (response) => {
          console.log(response);
          // Xử lý thành công, ví dụ hiển thị thông báo, cập nhật lại danh sách giỏ hàng, vv.
        },
        (error) => {
          console.log(error);
          // Xử lý lỗi, ví dụ hiển thị thông báo lỗi.
        }
      );
    }
  }
  

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchKeyword = params['search'] || '';
      this.searchProducts();
    });
    this.fetchProducts();
  }

  searchProducts() {
    const searchKeywordLower = this.searchKeyword.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchKeywordLower)
    );
  }
  

  fetchProducts(): void {
    this.productService.getAllProduct(this.currentPage, this.itemsPerPage).subscribe(
      (data: any) => {
        console.log(data);
        
        this.products = data.docs;
        this.totalPages = data.totalPages;
        this.searchProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.fetchProducts();
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchProducts();
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchProducts();
    }
  }
}
