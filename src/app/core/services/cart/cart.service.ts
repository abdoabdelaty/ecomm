import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  token:any=localStorage.getItem('token');


  constructor(private httpClient:HttpClient) { }
  addcart(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart` ,
      {
        "productId": id
      }
    )
  }
  datacart():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`
    )
  }
  removecart(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`
    )
  }
  updatacart(id:string,count:number ):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}` ,
      {
        "count": count
      }
    )
  }
  clearcart():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart` ,
    )
  }
}
