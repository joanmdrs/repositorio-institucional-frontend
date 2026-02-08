import api from "../api/api";
import type { PalavraChaveInterface } from "../interfaces/PalavraChaveInterface";

interface ListarPalavrasChaveParams {
    search?: string;
    page?: number;
}

export function criarPalavraChave(data: PalavraChaveInterface) {
    return api.post("palavra_chave/", data);
}

export function listarPalavrasChave(params?: ListarPalavrasChaveParams) { 
    return api.get("palavra_chave/", {params});
}

export function atualizarPalavraChave(id: number, data: PalavraChaveInterface) {
    return api.patch(`palavra_chave/${id}/`, data);
}

export function excluirPalavraChave(id: number) {
    return api.delete(`palavra_chave/${id}/`);
}

export function obterPalavraChavePeloId(id: number) {
    return api.get(`palavra_chave/${id}/`);
}