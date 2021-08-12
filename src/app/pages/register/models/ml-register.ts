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
