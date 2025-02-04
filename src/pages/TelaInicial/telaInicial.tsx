import { useState, useEffect } from "react"
import { GraficoPB } from "@/components/GráficoClientesCompras/graficoPB"
import { GraficoBV } from "@/components/GráficoBebidasVendidas/graficoBV"
import { GraficoQP } from "@/components/GráficoPedidosRealizados/graficoQP"
import NavBar from "@/components/NavBar/navbar"
import cafe from "../../assets/imagens/cafe.png"
import { Button } from "@/components/ui/button"
import { CircleUserRound } from "lucide-react"
import { useRouter } from "@tanstack/react-router"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

function TelaInicial() {
  const [loginData, setLoginData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Recupera os dados do usuário armazenados no localStorage
    const data = localStorage.getItem("loginData")
    if (data) {
      setLoginData(JSON.parse(data))
    }
  }, []);

  return (
    <div className="navbar">
      {/* Barra de navegação */}
      <NavBar />

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center">
          {/* Foto do Cliente */}
          <div className="flex items-center gap-4">
            {loginData?.pessoa?.imagem ? (
              <img
                className="rounded-full border-2 border-azuljava"
                src={loginData.pessoa.imagem}
                alt="Foto do cliente"
                style={{ width: "100px", height: "100px" }}
              />
            ) : (
              <CircleUserRound className="w-[100px] h-[100px] text-azuljava" />
            )}
          </div>

          {/* Logo da Cafeteria */}
          <div className="flex flex-col items-center text-white">
            <img src={cafe} alt="Cafeteria Java" className="h-24 w-24 mr-12" />
            <h1 className="text-lg font-bold p-2 mr-12">Cafeteria Java</h1>
          </div>

          {/* Botão de Sair */}
          <Button className="bg-red-600 hover:bg-red-400 p-5" onClick={() => {
            localStorage.clear();
            router.navigate({ to: "/" })
          }} >
            SAIR
          </Button>
        </div>

        {/* Mensagem de boas-vindas */}
        {loginData && loginData.pessoa && (
          <p className="mt-4 text-white text-lg">
            ☕ Bem-vindo, <strong>{loginData.pessoa.nome}</strong> ☕
          </p>
        )}

        {/* Grid de gráficos */}
        <div className="flex justify-center text-white font-semibold text-2xl mr-3">Dashboards</div>
        <Carousel
          plugins={[
            Autoplay({
              stopOnMouseEnter: true,
              stopOnInteraction:false,
              delay: 10000,
            }),
          ]}
          className="max-w-2xl mx-auto mt-2">
          <CarouselContent>
            <CarouselItem>
              <Card>
                <CardContent className="flex justify-center p-6">
                  <GraficoPB />
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardContent className="flex justify-center p-6">
                  <GraficoBV />
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardContent className="flex justify-center p-6">
                  <GraficoQP />
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
    </div>
  );
}

export default TelaInicial