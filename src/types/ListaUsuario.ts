export type ClientsDTO = {
  idCliente: number;
  idTipoCliente: number;
  tipoClienteDescripcion: string;
  idTipoDocumento: number;
  tipoDocumentoDescripcion: string;
  nombreCompleto: string;
  telefono: string;
  numeroDocumento: string;
  activo: boolean;
  fechaNacimiento: string;
  username: string;
  email: string;
  password: string;
  rol: {
    idRol: number;
    nombre: string;
  };
  direccion?: {
    idDireccion: number;
    ciudad: string;
    direccion: string;
  };
};
