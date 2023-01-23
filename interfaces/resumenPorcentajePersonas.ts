export interface IResumenPorcentajePersonas {
  ejecucion: EjecucionPorcentajePersonas;
  datos: DatosPorcentajePersonas;
}

interface DatosPorcentajePersonas {
  titulo: string;
  label_nivel_de_riesgo: string;
  leyendas: Leyendas;
  curva_promedios: CurvaPromedios;
  curva_limites: CurvaLimites;
}

interface CurvaLimites {
  tipo: string;
  color: string;
  datos: CurvaLimitesDato[];
}

interface CurvaLimitesDato {
  nombre_completo: string;
  porcentaje_promedio_con_riesgo_limite: number;
}

interface CurvaPromedios {
  tipo: string;
  color: string;
  datos: CurvaPromediosDato[];
}

interface CurvaPromediosDato {
  nombre_completo: string;
  promedio_de_porcentaje_de_riesgo: null;
}

interface Leyendas {
  promedio_de_porcentaje_riesgo: PromedioDePorcentajeRiesgo;
  promedio_de_porcentaje_riesgo_limite: PromedioDePorcentajeRiesgo;
}

interface PromedioDePorcentajeRiesgo {
  label: string;
}

interface EjecucionPorcentajePersonas {
  estado: boolean;
  mensaje: string;
}
