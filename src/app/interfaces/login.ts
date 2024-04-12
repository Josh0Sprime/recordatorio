

export interface LoginResponse {
    ok: boolean;
    msg: string;
    token?: string;
    user: string;
    userId: number;
}

export interface RegisterUserResponse {
    ok: boolean;
    msg: string;
}

export interface JwtValidate {
    ok: boolean;
    data?: {
        user: string;
        userId: number;
    };
    msg?: string;
}