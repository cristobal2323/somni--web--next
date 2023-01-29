export interface IReportePersonas {
  ejecucion: Ejecucion;
  datos: Datos;
}

interface Datos {
  titulo: string;
  leyendas: Leyenda[];
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
  color_letra: Backgound;
  align: Align;
}

enum Align {
  Center = "center",
  Left = "left",
}

enum Backgound {
  E5E7E9 = "#E5E7E9",
  The000000 = "#000000",
}

enum TipoLetra {
  Bold = "bold",
  Normal = "normal",
}

interface Leyenda {
  label: string;
  tipo: string;
  color: string;
}

interface Ejecucion {
  estado: boolean;
  mensaje: string;
}
