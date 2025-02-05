import { RouterProvider, Route, createRouter } from "@tanstack/react-router"
import { Route as RootRoute } from "./__root"
import TelaLogin from "../pages/TelaLogin/telaLogin"
import TelaInicial from "../pages/TelaInicial/telaInicial"
import ListagemClientes from "../pages/Pessoas/listagemCliente"
import ListagemBebidas from "../pages/Bebidas/listagemBebidas"
import ListagemPedidos from "../pages/Pedidos/listagemPedidos"
import CadastroCliente from "../pages/Pessoas/cadastroCliente"
import CadastroBebidas from "../pages/Bebidas/cadastroBebidas"
import CadastroPedido from "../pages/Pedidos/cadastroPedidos"
import EditarCliente from "../pages/Pessoas/editarCliente"
import EditarBebida from "../pages/Bebidas/bebidasEditar"
import EditarPedido from "../pages/Pedidos/editarPedido"
import ProtectedRoute from "@/contexts/ProtectedRoute"
import AuthGuard from "@/contexts/AuthGuard"

// Rotas de Pessoas
const pessoasRoutes = [
  new Route({
    getParentRoute: () => RootRoute,
    path: "/listagem-clientes",
    component: () => (
      <AuthGuard>
        <ListagemClientes />
      </AuthGuard>
    ),
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/cadastro-cliente",
    component: () => (
      <AuthGuard>
        <ProtectedRoute allowedPermissions={["ADMIN"]}>
          <CadastroCliente />
        </ProtectedRoute>
      </AuthGuard>
    ),
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/pessoas/${cliente.id}",
    component: () => (
      <AuthGuard>
        <ProtectedRoute allowedPermissions={["ADMIN"]}>
          <EditarCliente />
        </ProtectedRoute>
      </AuthGuard>
    ),
  }),
];

// Rotas de Bebidas
const bebidasRoutes = [
  new Route({
    getParentRoute: () => RootRoute,
    path: "/listagem-bebidas",
    component: () => (
      <AuthGuard>
        <ListagemBebidas />
      </AuthGuard>
    ),
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/cadastro-bebidas",
    component: () => (
      <AuthGuard>
        <ProtectedRoute allowedPermissions={["ADMIN", "AUX"]}>
          <CadastroBebidas />
        </ProtectedRoute>
      </AuthGuard>
    ),
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/bebidas/${bebida.id}",
    component: () => (
      <AuthGuard>
        <ProtectedRoute allowedPermissions={["ADMIN", "AUX"]}>
          <EditarBebida />
        </ProtectedRoute>
      </AuthGuard>
    ),
  }),
];

// Rotas de Pedidos
const pedidosRoutes = [
  new Route({
    getParentRoute: () => RootRoute,
    path: "/listagem-pedidos",
    component: () => (
      <AuthGuard>
        <ListagemPedidos />
      </AuthGuard>
    ),
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/cadastro-pedidos",
    component: () => (
      <AuthGuard>
        <ProtectedRoute allowedPermissions={["ADMIN", "AUX"]}>
          <CadastroPedido />
        </ProtectedRoute>
      </AuthGuard>
    ),
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/pedidos/${pedido.id}",
    component: () => (
      <AuthGuard>
        <ProtectedRoute allowedPermissions={["ADMIN", "AUX"]}>
          <EditarPedido />
        </ProtectedRoute>
      </AuthGuard>
    ),
  }),
];

// Rotas login e tela inicial
const generalRoutes = [
  new Route({
    getParentRoute: () => RootRoute,
    path: "/",
    component: TelaLogin,
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/inicial",
    component: () => (
      <AuthGuard>
        <TelaInicial />
      </AuthGuard>
    ),
  }),
];

export const router = createRouter({
  routeTree: RootRoute.addChildren([
    ...generalRoutes,
    ...pessoasRoutes,
    ...bebidasRoutes,
    ...pedidosRoutes,
  ]),
})

export function RouterConfig() {
  return <RouterProvider router={router} />
}
