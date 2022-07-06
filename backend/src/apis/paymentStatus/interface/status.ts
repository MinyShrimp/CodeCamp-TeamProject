export const PAYMENT_STATUS = {
    // 결제가 승인됨
    PAID: 'PAID',

    // 가상계좌가 발급됨
    READY: 'READY',

    // 예약결제가 시도됨
    FAILED: 'FAILED',

    // 환불됨
    CANCELLED: 'CANCELLED',
} as const;
export type PAYMENT_STATUS = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
