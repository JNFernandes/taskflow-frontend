export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}
