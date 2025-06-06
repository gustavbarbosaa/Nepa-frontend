export interface iNoticeRequest {
  nome: string;
  descricao: string;
  admin_id: string;
  arquivo: string;
}

export interface iNoticeResponse {
  nome: string;
  descricao: string;
  caminho_arquivo: string;
  slug: string;
}
