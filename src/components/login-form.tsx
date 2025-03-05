"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useRouter } from "next/navigation";

export function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
    } catch {
      toast({
        title: "Credenciales inválidas",
        description: "Usuario o contraseña inválidos, vuelva a intentar.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.isTrainer) {
      router.replace('/trainer-dashboard');
    }

    if (user) { 
      router.replace(`/clients/${user.id}`);
    }
  }, [user])


  return (
    <Card className="w-[350px] bg-neutral-50">
      <CardHeader>
        <CardTitle className="text-slate-900 text-3xl">Athlos One</CardTitle>
        <CardDescription className="text-neutral-600">
          Ingresa tus credenciales para acceder
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold text-slate-900">
              Correo electrónico<sup className="text-red-500">*</sup>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white border-neutral-300 text-neutral-800 focus:border-neutral-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-900 font-bold">
              Contraseña<sup className="text-red-500">*</sup>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white border-neutral-300 text-neutral-800 focus:border-neutral-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-neutral-700 font-bold active:scale-90 transition-all"
            disabled={isLoading || !email || !password}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
