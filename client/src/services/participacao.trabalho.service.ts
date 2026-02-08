import api from "../api/api";
import type { ParticipacaoTrabalhoInterface } from "../interfaces/ParticipacaoTrabalho.interface";

interface ListarParticipacaoTrabalhoParams {
    search?: string;
    page?: number;
}

export function criarParticipacaoTrabalho(data: ParticipacaoTrabalhoInterface) {
    return api.post('participacao_trabalho/', data);
}

export function atualizarParticipacaoTrabalho(id: number, data: ParticipacaoTrabalhoInterface) {
    return api.patch(`participacao_trabalho/${id}/`, data);
}

export function listarParticipacaoTrabalho(params?: ListarParticipacaoTrabalhoParams) {
    return api.get('participacao_trabalho/', {params});
}

export function excluirParticipacaoTrabalho(id: number) {
    return api.delete(`participacao_trabalho/${id}/`);
}

export function obterParticipacaoPeloId(id: number) {
    return api.get(`participacao_trabalho/${id}/`)
}