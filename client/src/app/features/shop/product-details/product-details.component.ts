import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../../core/services/shop.service';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatIcon,
    MatFormField,
    MatInput, 
    MatLabel,
    MatDivider,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  product?: Product;

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;

    this.shopService.getProduct(+id).subscribe({
      next: product => this.product = product,
      error: error => console.error(error)
    })
  }
}
