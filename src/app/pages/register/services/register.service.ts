import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mlCreateOrder, mlResCreateOrder } from '../models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Basic ' + btoa('rzp_test_I8kNJbHC3cCRab:kNEFXCCz2kj5XkjOyyATKi1p'),
  }),
};

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  get nativeWindow(): any {
    return _window();
  }
  constructor(private http: HttpClient) {}
  /**
   * Create Order
   */
  public CreateOrder(
    OrderDetails: mlCreateOrder
  ): Observable<mlResCreateOrder> {
    const data = JSON.parse(JSON.stringify(OrderDetails));

    let res = this.http.post<mlResCreateOrder>('api/orders', data, httpOptions);

    return res;
  }
}
