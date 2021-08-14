export class MlRegister {}

// export class mlCreateOrder {
//     amount?: number;
//     currency?: string;
//     receipt?: string;
//     notes?: any;
//     partial_payment?: boolean;
//     constructor
// }

export class mlCreateOrder {
  amount: number;
  currency: string;
  receipt?: string;
  notes?: any;
  partial_payment?: boolean;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }
}

export class mlResCreateOrder {
  id?: string;
  amount?: number;
  partial_payment?: boolean;
  amount_paid?: number;
  amount_due?: number;
  currency?: string;
  receipt?: string;
  offer_id?: string;
  status?: string;
  attempts?: number;
  notes?: any;
  created_at?: number;
}

export class mlResRazorpaySuccess {
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export class mlResRazorpayFailure {
  code?: string;
  description?: string;
  field?: string;
  source?: string;
  step?: string;
  reason?: string;
  metadata?: mlRazorpayFailureMetaData = new mlRazorpayFailureMetaData();
}

export class mlRazorpayFailureMetaData {
  order_id?: string;
  payment_id?: string;
}
