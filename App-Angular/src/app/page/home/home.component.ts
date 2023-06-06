import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interface/interface';
import { ProductService } from 'src/app/services/product.service';

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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProduct(this.currentPage, this.itemsPerPage).subscribe(
      (data: any) => {
        this.products = data.docs;
        this.totalPages = data.totalPages;
        console.log(data);
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
