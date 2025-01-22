import { RouterProvider, Route, RootRoute, createRouter } from "@tanstack/react-router";
import TelaLogin from "./pages/TelaLogin";
import TelaInicial from "./pages/TelaInicial";
import ListagemClientes from "./pages/ListagemClientes";
import ListagemBebidas from "./pages/ListagemBebidas";
import ListagemPedidos from "./pages/ListagemPedidos";
import CadastroCliente from "./pages/CadastroCliente";
import CadastroBebidas from "./pages/CadastroBebidas";
import CadastroPedidos from "./pages/CadastroPedidos";


const rootRoute = new RootRoute();

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: TelaLogin,
});

const inicialRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/inicial",
  component: TelaInicial,
});

const listagemClientesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/ListagemClientes",
  component: ListagemClientes,
});

const listagemBebidasRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/ListagemBebidas",
  component: ListagemBebidas,
});

const listagemPedidosRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/ListagemPedidos",
  component: ListagemPedidos,
});

const cadastroClienteRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/CadastroCliente",
  component: CadastroCliente,
});

const cadastroBebidasRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/CadastroBebidas",
  component: CadastroBebidas,
});

const cadastroPedidosRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/CadastroPedidos",
  component: CadastroPedidos,
});



// Colocar todas as rotas nessa árvore de rotas
export const router = createRouter({
  routeTree: rootRoute.addChildren([
    loginRoute,
    inicialRoute,
    listagemClientesRoute,
    listagemBebidasRoute,
    listagemPedidosRoute,
    cadastroClienteRoute,
    cadastroBebidasRoute,
    cadastroPedidosRoute,
  ]),
});

// Exportando o `RouterProvider` para ser usado no `main.tsx`
export function RouterConfig() {
  return <RouterProvider router={router} />;
}
