export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    status: string;
  }

export interface LoginRes{
  access_token: string;
  user: User
}