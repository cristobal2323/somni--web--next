export interface IResumenTiempo {
  ejecucion: EjecucionTiempo;
  datos: DatosTiempo;
}

interface DatosTiempo {
  titulo: string;
  label_nivel_de_riesgo: string;
  label_cantidad_de_controles: string;
  barra_controles: BarraControles;
  curva_promedio_de_porcentaje_de_riesgo: CurvaPromedioDePorcentajeDeRiesgo;
  curva_porcentaje_promedio_con_riesgo_limite: CurvaPorcentajePromedioConRiesgoLimite;
}

interface BarraControles {
  tipo: string;
  leyendas: BarraControlesLeyendas;
  colores: BarraControlesColores;
  datos: BarraControlesDato[];
}

interface BarraControlesColores {
  con_riesgo: ConRiesgoTiempo;
  sin_riesgo: SinRiesgo;
}

interface ConRiesgoTiempo {
  color: string;
}

interface SinRiesgo {
  label: string;
}

interface BarraControlesDato {
  fecha: string;
  q_con_riesgo: number;
  q_sin_riesgo: number;
}

interface BarraControlesLeyendas {
  con_riesgo: SinRiesgo;
  sin_riesgo: SinRiesgo;
}

interface CurvaPorcentajePromedioConRiesgoLimite {
  tipo: string;
  leyendas: CurvaPorcentajePromedioConRiesgoLimiteLeyendas;
  colores: CurvaPorcentajePromedioConRiesgoLimiteColores;
  datos: CurvaPorcentajePromedioConRiesgoLimiteDato[];
}

export interface CurvaPorcentajePromedioConRiesgoLimiteColores {
  porcentaje_promedio_con_riesgo_limite: ConRiesgoTiempo;
}

export interface CurvaPorcentajePromedioConRiesgoLimiteDato {
  fecha: string;
  porcentaje_promedio_con_riesgo_limite: number;
}

export interface CurvaPorcentajePromedioConRiesgoLimiteLeyendas {
  porcentaje_promedio_con_riesgo_limite: SinRiesgo;
}

export interface CurvaPromedioDePorcentajeDeRiesgo {
  tipo: string;
  leyendas: CurvaPromedioDePorcentajeDeRiesgoLeyendas;
  colores: CurvaPromedioDePorcentajeDeRiesgoColores;
  datos: CurvaPromedioDePorcentajeDeRiesgoDato[];
}

export interface CurvaPromedioDePorcentajeDeRiesgoColores {
  promedio_de_porcentaje_de_riesgo: ConRiesgoTiempo;
}

export interface CurvaPromedioDePorcentajeDeRiesgoDato {
  fecha: string;
  promedio_de_porcentaje_de_riesgo: null;
}

export interface CurvaPromedioDePorcentajeDeRiesgoLeyendas {
  promedio_de_porcentaje_de_riesgo: SinRiesgo;
}

export interface EjecucionTiempo {
  estado: boolean;
  mensaje: string;
}
