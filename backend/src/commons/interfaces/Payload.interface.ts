interface __Payload {
    name: string;
    email: string;
    isAdmin?: boolean;
}

export interface IPayload extends __Payload {
    id: string;
    access_token: string;
    access_exp: number;
    refresh_token: string;
    refresh_exp: number;
}

export interface IPayloadSub extends __Payload {
    sub: string;
    exp?: number;
    iat?: number;
}
