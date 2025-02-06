import { RouterProvider, Route, createRouter } from "@tanstack/react-router"
import { Route as RootRoute } from "./__root"
import TelaLogin from "../pages/TelaLogin/telaLogin"
import TelaInicial from "../pages/TelaInicial/telaInicial"



  const rotanInicial = new Route({
    getParentRoute: () => RootRoute,
    path: "/",
    component: TelaLogin,
  })
  
  const rotaTela2 = new Route({
    getParentRoute: () => RootRoute,
    path: "/tela2",
    component: TelaInicial,
  })

export const router = createRouter({
  routeTree: RootRoute.addChildren([
    rotanInicial, rotaTela2
  ]),
})

export function RouterConfig() {
  return <RouterProvider router={router} />
}
