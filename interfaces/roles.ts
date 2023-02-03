export interface IRoles {
  ejecucion: Ejecucion;
  datos: Dato[];
}

interface Dato {
  id: number;
  codigo: string;
  descripcion: string;
  esadmin: boolean;
}

interface Ejecucion {
  estado: boolean;
  mensaje: string;
}
