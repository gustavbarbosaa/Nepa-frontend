import { eProjectStatus } from '@features/projects/enums/status.enum';

export interface iInscricao {
  id: string;
  status: eProjectStatus;
  bolsista: boolean;
  aluno_id: string;
  projeto_id: string;
}
