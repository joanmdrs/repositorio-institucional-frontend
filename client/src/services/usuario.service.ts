import api from "../api/api";
import type { UsuarioInterface } from "../interfaces/UsuarioInterface";

interface ListarUsuariosParams {
    search?: string;
    page?: number;
}

export function criarUsuario(data: UsuarioInterface) {
    return api.post("/usuario/", data)
}

export function listarUsuarios(params?: ListarUsuariosParams) {
    return api.get("usuario/", {params})
}

export function obterUsuarioPeloId(id: number) {
    return api.get(`usuario/${id}/`)
}

export function excluirUsuario(id: number) {
    return api.delete(`usuario/${id}/`)
}

export function listarGrupos() {
    return api.get("groups/")
}