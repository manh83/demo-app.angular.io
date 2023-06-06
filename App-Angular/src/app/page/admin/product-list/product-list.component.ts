import { Component } from '@angular/core';
import { ICategory, IProduct } from 'src/app/interface/interface';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: IProduct[] = [];
  categories: ICategory[] = [];
  currentPage = 1; // Current page number
  limit = 10; // Number of products to fetch per page
  search: string = '';
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.fetchCategories();
    this.fetchProducts();
  }

  fetchCategories(): void {
    this.categoryService.getAllCategory().subscribe(
      (data: any) => {
        this.categories = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  fetchProducts(): void {
    this.productService.getAllProduct(this.currentPage, this.limit).subscribe(
      (data: any) => {
        this.products = data.docs;
      },
      error => {
        console.log(error);
      }
    );
  }

  nextPage(): void {
    this.currentPage++;
    this.fetchProducts();
  }
  pre():void{
    if (this.currentPage > 1) {
      this.currentPage--; // Giảm chỉ số trang khi nhấn nút "Previous", nhưng đảm bảo chỉ số trang không âm
    }
    this.fetchProducts();
  }

  get filteredProducts() {
    const searchLower = this.search ? this.search.toLowerCase() : '';
    return this.products.filter(product =>
      product.name.toLowerCase().includes(searchLower)
    );
  }
  
  

  getCategoryName(categoryId: any): string {
    const category = this.categories.find(c => c._id === categoryId);
    return category ? category.name : '';
  }

  removeProduct(id: any) {
    Swal.fire({
      text: 'Bạn có chắc chắn muốn xóa không?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(() => {
          this.products = this.products.filter(product => product._id !== id);
          Swal.fire('Deleted!', 'Xóa sản phẩm thành công!', 'success');
        });
      }
    });
  }

  editProduct(id: any): void {
    Swal.fire({
      text: 'Bạn có muốn cập nhật sản phẩm?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Cập nhật',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['admin/products', id, 'update']);
      }
    });
  }
}
