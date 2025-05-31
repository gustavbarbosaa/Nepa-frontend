export interface iRegisterUserRequest {
  nome: string;
  matricula: string;
  email: string;
  senha: string;
  telefone: string;
  curso_id: string;
}

export interface iRegisterUserResponse {
  id: string;
  nome: string;
  matricula: string;
  email: string;
  telefone: string;
  autoridade: string;
  ativo: boolean;
}
