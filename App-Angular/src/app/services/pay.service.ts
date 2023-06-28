import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayService {
  private userInfo: any;
  private selectedProducts: any[] = [];

  constructor() { }

  setUserInfo(userInfo: any) {
    this.userInfo = userInfo;
  }

  getUserInfo() {
    return this.userInfo;
  }

  setSelectedProducts(selectedProducts: any[]) {
    this.selectedProducts = selectedProducts;
  }

  getSelectedProducts() {
    return this.selectedProducts;
  }

  clearSelectedProducts() {
    this.selectedProducts = [];
  }
}
