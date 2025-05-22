export interface RegisterDTO {
  firstName: string;
  lastName: string;
  phone: string;
  birth: Date;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthPayload {
  id: number;
  firstName: string;
  email: string;
}
