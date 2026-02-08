export interface ArquivoDetail {
    id: number;
    trabalho: number;
    name: string;
    arquivo: string;
    tipo: string;
    tamanho: number;
    checksum: string;
    criado_em: string;
}

export interface ArquivoCreate {
    trabalho: number;
    arquivo: File; 
    tipo: string;
}

