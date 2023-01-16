export interface IAuth {
  mensaje: string;
  auth_token: string;
  usuario: Usuario;
  persona: null;
  empresa: Empresa;
}

export interface Empresa {
  id: number;
  nombre: string;
  uid: string;
  fecha_enrolamiento: Date;
  pais_id: number;
  huso_horario: string;
  habilitada: boolean;
  nombre_contacto: string;
  contacto_email: string;
  contacto_fono: string;
  origen_id: null;
  codigo: string;
  admin_somni: string;
}

export interface Usuario {
  id: number;
  password_digest: string;
  lenguaje: string;
  estado: number;
  visible: boolean;
  email: string;
  pais_id: number;
  timestamp: Date;
  empresa_id: number;
  username: string;
  origen_id: null;
  turno_id: null;
  turno_dia: null;
}
