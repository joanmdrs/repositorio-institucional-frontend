export interface TrabalhoInterface {
    id?: number;
    titulo: string;
    resumo: string;
    ano_defesa: number;
    data_defesa: string;
    tipo: 'ART' | 'MON' | 'DIS' | 'TES';
    idioma: string;
    curso: number;
    orientador: number;
    coorientador?: number | null;
    autores: number[];
    palavras_chave: number[];
    criado_em: string;       
    atualizado_em: string;
}
