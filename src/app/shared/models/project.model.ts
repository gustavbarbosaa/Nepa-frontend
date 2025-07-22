import { ProjectStatus } from '@features/projects/enums/status.enum';

export interface iProject {
  id: string;
  titulo: string;
  sumario: string;
  status: ProjectStatus;
  titulacao: string;
  linha_de_pesquisa: string;
  vagas_ocupadas: number;
  vagas_totais: number;
  palavras_chave: string;
  localizacao: string;
  populacao: string;
  objetivo_geral: string;
  objetivo_especifico: string;
  justificativa: string;
  metodologia: string;
  cronograma_atividades: string;
  referencias: string;
  aceitou_termos: boolean;
  data_limite_edicao: string;
}
