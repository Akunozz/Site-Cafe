//verifica permissão do usuário e restringe onde não tem permissão
import React, { useEffect, useState, useRef } from "react"
import { useRouter } from "@tanstack/react-router"

interface ProtectedRouteProps {
  allowedPermissions: string[];   //permissão permitida
  children: React.ReactNode;      //children que engloba o conteúdo protegido
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedPermissions, children }) => {
  const [userPermission, setUserPermission] = useState<string | null>(null);  //armazena permissão
  const router = useRouter();  //rota
  const hasAlerted = useRef(false);  //só um alerta

  useEffect(() => {
    const perm = localStorage.getItem("permissao"); //busca a permissão
    if (perm) {
      setUserPermission(perm.trim().toUpperCase());
    }
  }, []);

  useEffect(() => {
    if (userPermission !== null) {
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