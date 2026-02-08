export interface UsuarioInterface {
    id?: number;
    username: string;
    password: string;
    email: string;
    groups: number[];
    groups_detail: { id: number; name: string }[];
}