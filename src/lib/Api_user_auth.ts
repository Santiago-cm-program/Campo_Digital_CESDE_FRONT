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

const API_URL = "http://localhost:8080/v1/api/Users/POST/Login"; 

export async function login(data: LoginRequest): Promise<LoginResponse> {
    // Codifica las credenciales en Base64 para la cabecera 'Authorization'
    const base64Credentials = btoa(`${data.username}:${data.password}`);
    
        const response = await axios.post<LoginResponse>(
            API_URL,
            data, // Aquí se envía el cuerpo del JSON (username y password)
            { 
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${base64Credentials}`
                } 
            }
        );
        return response.data;
    
}
