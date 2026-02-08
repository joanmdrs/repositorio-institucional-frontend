import api from "../api/api";
/* ================= CREATE ================= */
export async function criarTrabalho(formData: FormData) {
    return api.post("trabalho/", formData);
}

/* ================= UPDATE ================= */
export async function atualizarTrabalho(id: number, formData: FormData) {
    return api.put(`trabalho/${id}/`, formData);
}

/* ================= DELETE ================= */
export async function excluirTrabalho(id: number) {
    return api.delete(`trabalho/${id}/`);
}

/* ================= GET BY ID ================= */
export async function obterTrabalhoPeloId(id: number) {
    return api.get(`trabalho/${id}/`);
}

/* ================= LIST / SEARCH / PAGINATION ================= */
interface ListarTrabalhosParams {
    search?: string;
    page?: number;
}

export async function listarTrabalhos(params?: ListarTrabalhosParams) {
    return api.get("trabalho/", {
        params
    });
}
