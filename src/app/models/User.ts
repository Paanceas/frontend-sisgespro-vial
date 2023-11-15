export interface User {
  user: string;
  roll: string;
  password: string;
}

export interface UserResponse {
  estado: boolean;
  roll: string;
  usuario: string;
}
