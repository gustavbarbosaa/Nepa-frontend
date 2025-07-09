export interface iNoticeRequest {
  nome: string;
  descricao: string;
}

export interface iNoticeResponse {
  id: string;
  nome: string;
  descricao: string;
  caminho_arquivo: string;
  slug: string;
}
