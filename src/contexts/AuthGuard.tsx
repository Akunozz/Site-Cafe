//verifica se possui token do localStorage, se não tier volta pra tela de login
import React, { useEffect, useState } from "react"
import { useRouter } from "@tanstack/react-router"

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); //verificação da autenticação
  const router = useRouter(); //rota

  useEffect(() => {
    const token = localStorage.getItem("token");  //busca o token

    if (!token) {
      router.navigate({ to: "/" });
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return null;
  }

  return <>{children}</>;
}

export default AuthGuard
