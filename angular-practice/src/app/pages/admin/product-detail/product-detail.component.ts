import { ProductService } from './../../../services/product.service';
import { Component, inject } from '@angular/core';
import { Iproduct } from '../../../../types/products';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  //Khi bạn sử dụng product!: Iproduct;, điều này có nghĩa là bạn cam kết rằng biến product sẽ được gán một giá trị thuộc kiểu Iproduct trước khi sử dụng nó trong mã của bạn
  productId!: string;
  product!: Iproduct;

  productService = inject(ProductService);
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    //convert to string
    this.productId = `${this.route.snapshot.paramMap.get('id')}`;
    this.productService.getProduct(this.productId).subscribe(
      (res: any) => {
        if (res && res.status === 'success' && res.product) {
          this.product = res.product;
          if (!this.product) this.router.navigate(['/page-not-found']);
        } else {
          this.router.navigate(['/page-not-found']);
        }
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
}
