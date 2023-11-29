export interface IUploadArchive {
  ejecucion: Ejecucion;
  datos: Dato;
}

interface Dato {
  empresa_id: string;
  archivo_usuarios: string;
}

interface Ejecucion {
  estado: boolean;
  mensaje: string;
}
