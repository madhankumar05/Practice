import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services';
@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class EntryComponent implements OnInit {
  constructor(private srvRegister: RegisterService) {}

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
