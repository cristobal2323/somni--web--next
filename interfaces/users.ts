export interface IUsers {
  ejecucion: Ejecucion;
  datos: Dato[];
}

interface Dato {
  user_id: number;
  email: string;
  pais_id: number;
  nombre_completo: string;
  roles_asignados: RolesAsignados;
  asignaciones_turno: AsignacionesTurno[];
  tipo_turno: TipoTurno;
}

interface AsignacionesTurno {
  turno_id: number;
  turno_nombre: TurnoNombre;
  asignado: boolean;
}

enum TurnoNombre {
  The5X2 = "5x2",
  The7X7 = "7x7",
}

enum RolesAsignados {
  AdminOperadorSupervisorAdministradorEmpresa = "admin, operador, supervisor, administrador_empresa, ",
  Operador = "operador, ",
}

enum TipoTurno {
  Dia = "dia",
}

interface Ejecucion {
  estado: boolean;
  mensaje: string;
}
