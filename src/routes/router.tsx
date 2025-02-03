import { RouterProvider, Route, createRouter } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import TelaLogin from "../pages/TelaLogin/telaLogin";
import TelaInicial from "../pages/TelaInicial/telaInicial";
import ListagemClientes from "../pages/Pessoas/listagemCliente";
import ListagemBebidas from "../pages/Bebidas/listagemBebidas";
import ListagemPedidos from "../pages/Pedidos/listagemPedidos";
import CadastroCliente from "../pages/Pessoas/cadastroCliente";
import CadastroBebidas from "../pages/Bebidas/cadastroBebidas";
import CadastroPedido from "../pages/Pedidos/cadastroPedidos";
import EditarCliente from "../pages/Pessoas/editarCliente";
import EditarBebida from "../pages/Bebidas/bebidasEditar";
import EditarPedido from "../pages/Pedidos/editarPedido";
import ProtectedRoute from "@/contexts/ProtectedRoute";
import RequireAuth from "@/contexts/RequireAuth";

// Rotas de Pessoas
const pessoasRoutes = [
  new Route({
    getParentRoute: () => RootRoute,
    path: "/listagem-clientes",
    component: () => (
      <RequireAuth>
        <ListagemClientes />
      </RequireAuth>
    ),
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/cadastro-cliente",
    component: () => (
      <RequireAuth>
        <ProtectedRoute allowedPermissions={["ADMIN"]}>
          <CadastroCliente />
        </ProtectedRoute>
      </RequireAuth>
    ),
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/pessoas/${cliente.id}",
    component: () => (
      <RequireAuth>
        <ProtectedRoute allowedPermissions={["ADMIN", "AUX"]}>
          <EditarCliente />
        </ProtectedRoute>
      </RequireAuth>
    ),
  }),
];

// Rotas de Bebidas
const bebidasRoutes = [
  new Route({
    getParentRoute: () => RootRoute,
    path: "/listagem-bebidas",
    component: () => (
      <RequireAuth>
        <ListagemBebidas />
      </RequireAuth>
    ),
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/cadastro-bebidas",
    component: () => (
      <RequireAuth>
        <ProtectedRoute allowedPermissions={["ADMIN"]}>
          <CadastroBebidas />
        </ProtectedRoute>
      </RequireAuth>
    ),
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/bebidas/${bebida.id}",
    component: () => (
      <RequireAuth>
        <ProtectedRoute allowedPermissions={["ADMIN", "AUX"]}>
          <EditarBebida />
        </ProtectedRoute>
      </RequireAuth>
    ),
  }),
];

// Rotas de Pedidos
const pedidosRoutes = [
  new Route({
    getParentRoute: () => RootRoute,
    path: "/listagem-pedidos",
    component: () => (
      <RequireAuth>
        <ListagemPedidos />
      </RequireAuth>
    ),
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/cadastro-pedidos",
    component: () => (
      <RequireAuth>
        <ProtectedRoute allowedPermissions={["ADMIN", "AUX"]}>
          <CadastroPedido />
        </ProtectedRoute>
      </RequireAuth>
    ),
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/pedidos/${pedido.id}",
    component: () => (
      <RequireAuth>
        <ProtectedRoute allowedPermissions={["ADMIN", "AUX"]}>
          <EditarPedido />
        </ProtectedRoute>
      </RequireAuth>
    ),
  }),
];

// Rotas gerais
const generalRoutes = [
  new Route({
    getParentRoute: () => RootRoute,
    path: "/",
    component: TelaLogin, // Login não precisa de autenticação
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/inicial",
    component: () => (
      <RequireAuth>
        <TelaInicial />
      </RequireAuth>
    ),
  }),
];

// Combinação de todas as rotas
export const router = createRouter({
  routeTree: RootRoute.addChildren([
    ...generalRoutes,
    ...pessoasRoutes,
    ...bebidasRoutes,
    ...pedidosRoutes,
  ]),
});

// Exportando o `RouterProvider` para ser usado no `main.tsx`
export function RouterConfig() {
  return <RouterProvider router={router} />;
}
