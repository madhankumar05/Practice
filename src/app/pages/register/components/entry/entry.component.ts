import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { mlCreateOrder, mlResCreateOrder } from '../../models';
import { RegisterService } from '../../services';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class EntryComponent implements OnInit {
  public ResCreateOrder: mlResCreateOrder;

  constructor(
    private srvRegister: RegisterService,
    private _cd: ChangeDetectorRef
  ) {
    this.ResCreateOrder = new mlResCreateOrder();
  }

  ngOnInit(): void {}

  options = {
    key: 'rzp_test_I8kNJbHC3cCRab', // Enter the Key ID generated from the Dashboard
    amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'Acme Corp',
    description: 'Test Transaction',
    image: 'https://example.com/your_logo',
    order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response: any) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    modal: {
      ondismiss: function () {
        alert('Checkout form closed');
      },
    },
    prefill: {
      name: 'Gaurav Kumar',
      email: 'gaurav.kumar@example.com',
      contact: '9999999999',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#3399cc',
    },
  };

  pay() {
    let paymentID = 'pay_GwuZM1xnnWdTZM';
    let subscriptionID = 'sub_GwuYz1aAg0fMdq';

    // Razorpay subscription success signature
    let RazorpaySignature =
      '99f4a3b57651e241bb410c6d583d89bbedc8742aed1385a9cd7dadc5930d23d5';
    let RazorpayKeySecret = 'kNEFXCCz2kj5XkjOyyATKi1p';

    var generated_signature = CryptoJS.HmacSHA256(
      paymentID + '|' + subscriptionID,
      RazorpayKeySecret
    );
    alert(generated_signature);
    if (RazorpaySignature == generated_signature.toString()) {
      alert('s');
    } else {
      alert('f');
    }

    this.CreateOrder(30000, 'INR');
  }

  CreateOrder(amount: number, currency: string) {
    let objCreateOrder: mlCreateOrder = new mlCreateOrder(amount, currency);
    this.srvRegister.CreateOrder(objCreateOrder).subscribe((res) => {
      this.ResCreateOrder = res;
      this._cd.markForCheck();
      if (this.ResCreateOrder.id) {
        this.InitCheckout(this.ResCreateOrder.id);
      } else {
        alert('Order not created !');
      }
    });
  }

  InitCheckout(OrderId: string) {
    this.options.order_id = OrderId;

    let rzp1 = new this.srvRegister.nativeWindow.Razorpay(this.options);
    rzp1.open();

    rzp1.on('payment.failed', function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  }
}
