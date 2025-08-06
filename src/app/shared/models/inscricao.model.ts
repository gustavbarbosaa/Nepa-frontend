import { eStatusInscricaoProjeto } from '@shared/enums/status-inscricao.enum';

export interface iInscricao {
  id: string;
  status: eStatusInscricaoProjeto;
  bolsista: boolean;
  aluno_id: string;
  projeto_id: string;
}
