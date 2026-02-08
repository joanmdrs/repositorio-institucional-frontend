export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginUser {
  id_usuario: number;
  id_pessoa: number;
  nome: string;
  email: string | null;
  groups: string[];
  active_group: number | null;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: LoginUser;
}
