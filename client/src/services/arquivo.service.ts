import api from "../api/api";


export function criarArquivo(formData: FormData) {
    return api.post("arquivo/", formData);
}

export function listarArquivos() { 
    return api.get("arquivo/");
}

export function excluirArquivo(id: number) {
    return api.delete(`arquivo/${id}/`);
}

export function obterArquivoPeloId(id: number) {
    return api.get(`arquivo/${id}/`);
}