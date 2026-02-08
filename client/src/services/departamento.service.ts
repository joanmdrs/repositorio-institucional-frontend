import api from "../api/api";
import type { DepartamentoInterface } from "../interfaces/DepartamentoInterface";

interface ListarDepartamentosParams {
    search?: string;
    page?: number;
}

export function criarDepartamento(data: DepartamentoInterface) {
    return api.post("departamento/", data);
}

export function listarDepartamentos(params?: ListarDepartamentosParams) { 
    return api.get("departamento/", { params });
}

export function atualizarDepartamento(id: number, data: DepartamentoInterface) {
    return api.put(`departamento/${id}/`, data);
}

export function excluirDepartamento(id: number) {
    return api.delete(`departamento/${id}/`);
}


export function obterDepartamentoPeloId(id: number) {
    return api.get(`departamento/obter-pelo-id/${id}/`)    
}