"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  login,
  LoginRequest,
  LoginResponse,
} from "@/lib/api_autenticacion/Api_user_auth";

export default function IniciarSesion() {
  const [formData, setFormData] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<LoginResponse | null>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username") || "";
    const savedPassword = localStorage.getItem("password") || "";
    setFormData({ username: savedUsername, password: savedPassword });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data: LoginResponse = await login(formData);
      setUser(data);
      localStorage.setItem("username", formData.username);
      localStorage.setItem("password", formData.password);
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold">
          Inicia sesión
        </CardTitle>
        <CardDescription className="text-center">
          Ingresa tus credenciales para continuar
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="text"
                placeholder="Usuario"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <CardFooter className="flex flex-col gap-2 mt-6">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Cargando..." : "Ingresar"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
