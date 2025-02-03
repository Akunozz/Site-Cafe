import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "@tanstack/react-router";

interface ProtectedRouteProps {
  allowedPermissions: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedPermissions, children }) => {
  const [userPermission, setUserPermission] = useState<string | null>(null);
  const router = useRouter();
  const hasAlerted = useRef(false);

  useEffect(() => {
    const perm = localStorage.getItem("permissao");
    setUserPermission(perm);
  }, []);

  useEffect(() => {
    if (!userPermission || !allowedPermissions.includes(userPermission)) {
      if (!hasAlerted.current) {
        alert("Acesso Negado. Você não tem permissão para acessar essa página.");
        hasAlerted.current = true;
        router.navigate({ to: "/inicial" });
      }
    }
  }, [userPermission, allowedPermissions, router]);

  if (!userPermission || !allowedPermissions.includes(userPermission)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
