export interface PessoaInterface {
    id?: number;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    titulacao_maxima: 'GRAD' | 'ESPE' | 'MEST' | 'DOUT' | 'POSDOUT';
    usuario: number;
}

