export interface AuthRequest {
    id?: number;
    name?: string;
    email: string;
    password: string;
}
export interface AuthResponse {
    token: string;
}