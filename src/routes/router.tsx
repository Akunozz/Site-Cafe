import { RouterProvider, Route, createRouter } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import TelaLogin from "../pages/TelaLogin/telaLogin";
import TelaInicial from "../pages/TelaInicial/telaInicial";
import ListagemClientes from "../pages/Pessoas/ListagemClientes/listagemCliente";
import ListagemBebidas from "../pages/Bebidas/ListagemBebidas/listagemBebidas";
import ListagemPedidos from "../pages/Pedidos/ListagemPedidos/listagemPedidos";
import CadastroCliente from "../pages/Pessoas/CadastroCliente/cadastroCliente";
import CadastroBebidas from "../pages/Bebidas/CadastroBebidas/cadastroBebidas";
import CadastroPedido from "../pages/Pedidos/CadastroPedidos/cadastroPedidos";
import EditarCliente from "../pages/Pessoas/EditarCliente/editarCliente";
import EditarBebida from "../pages/Bebidas/EditarBebidas/bebidasEditar";
import EditarPedido from "../pages/Pedidos/EditarPedido/editarPedido";


// Rotas de Pessoas
const pessoasRoutes = [
  new Route({
    getParentRoute: () => RootRoute,
    path: "/listagem-clientes",
    component: ListagemClientes,
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/cadastro-cliente",
    component: CadastroCliente,
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path:"/pessoas/${cliente.id}",
    component: EditarCliente,
  }),


];

// Rotas de Bebidas
const bebidasRoutes = [
  new Route({
    getParentRoute: () => RootRoute,
    path: "/listagem-bebidas",
    component: ListagemBebidas,
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/cadastro-bebidas",
    component: CadastroBebidas,
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path:"/bebidas/${bebida.id}",
    component: EditarBebida,
  }),
];

// Rotas de Pedidos
const pedidosRoutes = [
  new Route({
    getParentRoute: () => RootRoute,
    path: "/listagem-pedidos",
    component: ListagemPedidos,
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/cadastro-pedidos",
    component: CadastroPedido,
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/pedidos/${pedido.id}",
    component: EditarPedido,
  }),
];

// Rotas gerais
const generalRoutes = [
  new Route({
    getParentRoute: () => RootRoute,
    path: "/",
    component: TelaLogin,
  }),
  new Route({
    getParentRoute: () => RootRoute,
    path: "/inicial",
    component: TelaInicial,
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