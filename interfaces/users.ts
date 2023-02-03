export interface IUsers {
  ejecucion: Ejecucion;
  datos: Dato[];
}

interface Dato {
  user_id: number;
  email: string;
  pais_id: number;
  nombre_completo: string;
  roles_asignados: string;
  asignaciones_turno: AsignacionesTurno[];
  tipo_turno: string;
}

interface AsignacionesTurno {
  turno_id: number;
  turno_nombre: string;
  asignado: boolean;
}

interface Ejecucion {
  estado: boolean;
  mensaje: string;
}
