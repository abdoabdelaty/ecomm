import { Component, OnInit, inject } from '@angular/core';
import { OrdersService } from '../../../core/services/allorders/allorders.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  private readonly _OrdersService = inject(OrdersService);
  private readonly _AuthService = inject(AuthService);
  idUser: string = '';
  AllOrdersList: any;

  ngOnInit(): void {
    this._AuthService.getUserData(); // جلب بيانات المستخدم
    
    if (this._AuthService.data && this._AuthService.data.id) {
      this.idUser = this._AuthService.data.id;
      this._OrdersService.getUserOrders(this.idUser).subscribe({
        next: (res) => {
          this.AllOrdersList = res;
        },
      });
    } else {
      console.error("❌ User data is undefined or does not have an ID");
    }
  }
  
}