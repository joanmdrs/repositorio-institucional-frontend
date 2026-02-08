export interface ParticipacaoTrabalhoInterface {
    id?: number;
    trabalho: number;
    pessoa: number;
    papel: 'AUTOR' | 'ORIENTADOR' | 'COORIENTADOR';
    ordem_autoria: number;
}