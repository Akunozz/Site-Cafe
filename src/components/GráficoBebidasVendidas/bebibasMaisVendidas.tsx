import { useEffect, useState } from "react"
import { Pie, PieChart } from "recharts"
import BebidaRelatorioService from "@/services/BebidaRelatorioService"
import IBebidaRelatorio from "@/interfaces/IBebidaRelatorio"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function GraficoBV() {
  const [chartData, setChartData] = useState<
    { nome: string; vezesComprada: number; fill: string }[]
  >([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response: IBebidaRelatorio[] = await BebidaRelatorioService.getListarDados()

        const colors = ["#4F46E5", "#EC4899", "#F59E0B", "#10B981", "#8B5CF6", "#ade4b5",
             "#ffabab", "#ffdaab", "#ddffab", "#abe4ff", "#d9abff"] // Cores para as Bebidas
        
        // Corrigindo a tipagem na função map
        const dataFormatted = response.map((pedido: IBebidaRelatorio, index: number) => ({
          nome: pedido.nome,
          vezesComprada: pedido.quantidade,
          fill: colors[index % colors.length], // Define cores cíclicas
        }))

        setChartData(dataFormatted)
      } catch (error) {
        console.error("Erro ao buscar dados do relatório:", error)
      }
    }
    fetchData()
  }, [])

  const chartConfig = {
    vezesComprada: {
      label: "Total de Pedidos",
    },
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Bebidas mais vendias</CardTitle>
        <CardDescription>Janeiro 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="vezesComprada" nameKey="nome" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mostrando as bebidas mais vendidas
        </div>
      </CardFooter>
    </Card>
  )
}
