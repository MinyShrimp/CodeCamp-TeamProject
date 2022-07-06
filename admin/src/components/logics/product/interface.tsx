export interface IProduct {
    id: string;
    name: string;
    price: number;
    point: number;
    description: string;
}

export interface IPaymentInput {
    imp_uid: string;
    merchant_uid: string;
    paid_amount: number;
    status: 'PAID' | 'CANCELLED';
}
