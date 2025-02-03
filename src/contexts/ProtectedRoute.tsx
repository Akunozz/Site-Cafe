import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "@tanstack/react-router";

interface ProtectedRouteProps {
  allowedPermissions: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedPermissions, children }) => {
  const [userPermission, setUserPermission] = useState<string | null>(null);
  const router = useRouter();
  // useRef para garantir que o alerta seja exibido apenas uma vez
  const hasAlerted = useRef(false);

  useEffect(() => {
    // Recupera a permissão do usuário armazenada no localStorage
    const perm = localStorage.getItem("permissao");
    if (perm) {
      // Remove espaços extras e converte para letras maiúsculas para padronizar
      setUserPermission(perm.trim().toUpperCase());
    }
  }, []);

  useEffect(() => {
    if (userPermission !== null) {
      // Normaliza as permissões permitidas para caixa alta
      const normalizedAllowed = allowedPermissions.map(p => p.trim().toUpperCase());
      if (!normalizedAllowed.includes(userPermission)) {
        if (!hasAlerted.current) {
          alert(
            "Acesso Negado, o usuário não tem permissão para acessar essa página, voltando à Tela Inicial"
          );
          hasAlerted.current = true;
          router.navigate({ to: "/inicial" });
        }
      }
    }
  }, [userPermission, allowedPermissions, router]);

  // Enquanto não carregamos a permissão, podemos exibir um loading ou retornar null
  if (userPermission === null) {
    return null;
  }

  // Checa novamente se a permissão do usuário está na lista permitida
  const normalizedAllowed = allowedPermissions.map(p => p.trim().toUpperCase());
  if (!normalizedAllowed.includes(userPermission)) {
    return null;
  }

  // Caso possua a permissão necessária, renderiza o conteúdo protegido
  return <>{children}</>;
};

export default ProtectedRoute;