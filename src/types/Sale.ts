import { SaleDetail } from "./SaleDetail";

export interface Sale {
  idVenta?: number;
  usuario: number;
  fecha: string;
  total: number;
  detalles: SaleDetail[];
}
