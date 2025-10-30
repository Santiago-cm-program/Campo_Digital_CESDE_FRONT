// src/lib/Api_user_auth.ts
import axios from "axios";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  idCliente: number;
  nombreCompleto: string;
  activo: boolean;
  username: string;
  email:string;
  rol: {
    idRol: number;
    descripcion: string;
    fechaCreacion: string;
    activo: boolean;
  };
  direccion: {
    codigoCiudad: string;
    descripcion: string;
  };
}

const API_URL = "https://campo-digital-cesde.onrender.com/v1/api/Users/POST/Login"; 

export async function login(data: LoginRequest): Promise<LoginResponse> {
    
    const base64Credentials = btoa(`${data.username}:${data.password}`);
    
        const response = await axios.post<LoginResponse>(
            API_URL,
            data, 
            { 
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${base64Credentials}`
                } 
            }
        );
        return response.data;
    
}
