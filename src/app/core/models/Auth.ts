export interface AuthRequest {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
}
export interface AuthResponse {
    token: string;
}