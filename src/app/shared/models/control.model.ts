import { iFrequency } from './frequency.model';

export interface iControl {
  id: string;
  ano: number;
  mes: number;
  projeto_id: string;
  frequencia_semanais: iFrequency[];
}
