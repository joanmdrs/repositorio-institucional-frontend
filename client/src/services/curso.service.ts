import api from "../api/api";
import type { CursoInterface } from "../interfaces/CursoInterface"; 

interface ListarCursosParams {
    search?: string;
    page?: number;
}

export function criarCurso(data: CursoInterface) {
    return api.post("curso/", data);
}

export function listarCursos(params?: ListarCursosParams) { 
    return api.get("curso/", {params});
}

export function atualizarCurso(id: number, data: CursoInterface) {
    return api.patch(`curso/${id}/`, data);
}

export function excluirCurso(id: number) {
    return api.delete(`curso/${id}/`);
}

export function obterCursoPeloId(id: number){
    return api.get(`curso/${id}/`)
}