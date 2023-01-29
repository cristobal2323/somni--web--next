export interface IReporteDetalle {
  ejecucion: Ejecucion;
  datos: Datos;
}

interface Datos {
  titulo: string;
  leyendas: any[];
  filas: Fila[];
}

interface Fila {
  fila: number;
  celdas: Celda[];
}

interface Celda {
  numero: number;
  ancho: number;
  valor: string;
  tamano_letra: number;
  backgound: Backgound;
  tipo_letra: TipoLetra;
  color_letra: ColorLetra;
  align: Align;
}

enum Align {
  Left = "left",
}

enum Backgound {
  E5E7E9 = "#E5E7E9",
}

enum ColorLetra {
  The000000 = "#000000",
}

enum TipoLetra {
  Bold = "bold",
}

interface Ejecucion {
  estado: boolean;
  mensaje: string;
}
