import api from "../api/api";
import type { PessoaInterface } from "../interfaces/PessoaInterface";

interface ListarPessoasParams {
    search?: string;
    page?: number;
}

export function criarPessoa(data: PessoaInterface) {
    return api.post("pessoa/", data);
}

export function atualizarPessoa(id: number, data: PessoaInterface) {
    return api.patch(`pessoa/${id}/`, data);
}

export function excluirPessoa(id: number) {
    return api.delete(`pessoa/${id}/`);
}

export function obterPessoaPeloId(id: number) {
    return api.get(`pessoa/${id}/`);
}

export function listarPessoas(params?: ListarPessoasParams) {
    return api.get("pessoa/", { params });
}
