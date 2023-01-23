export interface IResumenTotales {
  ejecucion: Ejecucion;
  datos: Datos;
}

interface Datos {
  totales: Totales;
}

interface Totales {
  total_controles: ControlesConRiesgo;
  controles_con_riesgo: ControlesConRiesgo;
}

interface ControlesConRiesgo {
  label: string;
  valor: number;
}

interface Ejecucion {
  estado: boolean;
  mensaje: string;
}
