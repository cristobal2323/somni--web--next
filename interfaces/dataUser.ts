export interface IDataUser {
  ejecucion: Ejecucion;
  datos: DatoUser;
}

interface DatoUser {
  username: string;
  apellido_materno: string;
  apellido_paterno: string;
  email: string;
  lenguaje: string;
  nombres: string;
  uid: string;
  user_id: number;
}

interface Ejecucion {
  estado: boolean;
  mensaje: string;
}
