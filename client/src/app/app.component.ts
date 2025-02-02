import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, HeaderComponent]
})
export class AppComponent implements OnInit{
  
  baseUrl = 'https://localhost:5001/api/'
  private http = inject(HttpClient)
  title = 'E-COMMERCE';
  products: Product[] = [];

  ngOnInit(): void {
    this.http.get<Pagination<Product>>(this.baseUrl + 'products').subscribe({
      next: response => this.products = response.data,
      error: error => console.log(error),
      complete: () => console.log('complete')
    })
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;  // Use the product's id to track the item
  }
}
