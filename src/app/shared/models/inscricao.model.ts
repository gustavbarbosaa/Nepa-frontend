import { eStatusInscricaoProjeto } from '@shared/enums/status-inscricao.enum';

export interface iInscricao {
  id: string;
  status: eStatusInscricaoProjeto;
  bolsista: boolean;
  aluno: {
    id: string;
    nome: string;
    matricula: string;
    email: string;
    telefone: string;
  };
  projeto_id: string;
}
