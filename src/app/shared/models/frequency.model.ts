export interface iFrequency {
  id: string;
  realizado_em: Date;
  tempo_inicio: string;
  tempo_termino: string;
  descricao: string;
  observacao: string;
  alunos_presentes: { inscricao_id: string; presente: boolean }[];
}
