import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/proudcts/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../pipes/search/search.pipe';

@Component({
  selector: 'app-products',
  imports: [CarouselModule, FormsModule, SearchPipe, RouterLink, ProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
    private readonly productService = inject(ProductService)
    private readonly cartService = inject(CartService)
    private readonly toastrService = inject(ToastrService)
search: any;
    ngOnInit(): void {
      this.getproductsdata();
    }
    product:Iproduct[]=[]
    getproductsdata():void{
      this.productService.getِAllproudcts().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.product=res.data
        },
        error:(res)=>{
          console.log(res)
        }
      })
  
    }
    addcart(id:string):void{
      this.cartService.addcart(id).subscribe({
        next:(res)=>{
          console.log(res)
          this.toastrService.success(res.message,"fresh Cart")
        },
        error:(err)=>{
          console.log(err)
    
        }
      })
    
    }
  

}
