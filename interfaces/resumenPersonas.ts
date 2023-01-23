export interface IResumenPersonas {
  ejecucion: EjecucionResumen;
  datos: DatosResumen;
}

interface DatosResumen {
  tipo: string;
  label_cantidad_de_controles: string;
  titulo: Array<number | string>;
  leyendas: LeyendasPorcentajePersonas;
  colores: Colores;
  datos: Dato[];
}

interface Colores {
  con_riesgo: ConRiesgo;
  sin_riesgo: NRiesgo;
}

interface ConRiesgo {
  color: string;
}

interface NRiesgo {
  label: string;
}

interface Dato {
  nombre_completo: string;
  q_con_riesgo: number;
  q_sin_riesgo: number;
}

interface LeyendasPorcentajePersonas {
  con_riesgo: NRiesgo;
  sin_riesgo: NRiesgo;
}

interface EjecucionResumen {
  estado: boolean;
  mensaje: string;
}
