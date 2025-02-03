import React, { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (userData) {
      const { expiresAt } = JSON.parse(userData);

      // Se o tempo expirou, faz logout
      if (Date.now() > expiresAt) {
        localStorage.removeItem("userData");
        alert("Sua sessão expirou. Faça login novamente.");
        router.navigate({ to: "/" });
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return null; // Enquanto não verifica o login, não renderiza nada
  }

  return <>{children}</>;
};

export default RequireAuth;
