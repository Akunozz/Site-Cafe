//gráfico pedidos realizados por período utilizado na tela inicial
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import PedidosRelatorioService from "@/services/PedidosRelatorioService"
import IPedidoPorMes from "@/interfaces/IPedidoPorMes"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


// Lista de meses disponíveis para seleção
const meses = [
  { value: "2024-01", label: "Janeiro 2024" }, { value: "2024-02", label: "Fevereiro 2024" }, { value: "2024-03", label: "Março 2024" },
  { value: "2024-04", label: "Abril 2024" }, { value: "2024-05", label: "Maio 2024" }, { value: "2024-06", label: "Junho 2024" },
  { value: "2024-07", label: "Julho 2024" }, { value: "2024-08", label: "Agosto 2024" }, { value: "2024-09", label: "Setembro 2024" },
  { value: "2024-10", label: "Outubro 2024" }, { value: "2024-11", label: "Novembro 2024" }, { value: "2024-12", label: "Dezembro 2024" },
  { value: "2025-01", label: "Janeiro 2025" }, { value: "2025-02", label: "Fevereiro 2025" }, { value: "2025-03", label: "Março 2025" },
  { value: "2025-04", label: "Abril 2025" }, { value: "2025-05", label: "Maio 2025" }, { value: "2025-06", label: "Junho 2025" },
  { value: "2025-07", label: "Julho 2025" }, { value: "2025-08", label: "Agosto 2025" }, { value: "2025-09", label: "Setembro 2025" },
  { value: "2025-10", label: "Outubro 2025" }, { value: "2025-11", label: "Novembro 2025" }, { value: "2025-12", label: "Dezembro 2025" },
];

export function GraficoQP() {
  const [chartData, setChartData] = useState<{ anoMes: string; totalVendas: number; fill: string }[]>([]);  // armazena os dados no gráfico
  const [mesInicial, setMesInicial] = useState("2024-01");  //mes para filtro
  const [mesFinal, setMesFinal] = useState("2025-02");  //ano para filtro
  const [mensagem, setMensagem] = useState<string | null>(null);  //mensagem se não tiver dados
  const [mesAnoMaisPedidos, setMesAnoMaisPedidos] = useState<string | null>(null); // armazena período com mais pedidos

  //busca dados do relatório
  useEffect(() => {
    async function fetchData() {
      try {
        const response: IPedidoPorMes[] = await PedidosRelatorioService.getListarDados(mesInicial, mesFinal);

        if (response.length === 0) {
          setMensagem("Nenhum pedido realizado nesse período.");
          setChartData([]);
          setMesAnoMaisPedidos(null);
          return;
        }

        const colors = ["#4F46E5", "#EC4899", "#F59E0B", "#10B981", "#8B5CF6", "#ade4b5",
          "#ffabab", "#ffdaab", "#ddffab", "#abe4ff", "#d9abff"];

        const dataFormatted = response.map((pedido, index) => ({
          anoMes: pedido.anoMes,
          totalVendas: pedido.totalVendas,
          fill: colors[index % colors.length],
        }));

        setChartData(dataFormatted);
        setMensagem(null);

        // Encontrar o mês e ano com mais pedidos
        const periodoTop = response.reduce((max, pedido) =>
          pedido.totalVendas > max.totalVendas ? pedido : max
        );

        setMesAnoMaisPedidos(periodoTop.anoMes);
      } catch (error) {
        console.error("Erro ao buscar dados do relatório:", error);
        setMensagem("Erro ao carregar os dados.");
      }
    }
    fetchData();
  }, [mesInicial, mesFinal]);

  //definição do gráfico
  const chartConfig = {
    totalVendas: {
      label: "Total de Pedidos",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Quantidade de pedidos realizados entre {meses.find(m => m.value === mesInicial)?.label} - {meses.find(m => m.value === mesFinal)?.label}</CardTitle>      
      </CardHeader>
      <CardContent>
        {/* Dropdown de seleção de datas */}
        <div className="flex gap-4 mb-4">
          <Select onValueChange={setMesInicial} defaultValue={mesInicial}>
            <SelectTrigger className="w-1/3 border-laranjajava">
              <SelectValue placeholder="Mês Inicial" />
            </SelectTrigger>
            <SelectContent>
              {meses.map((mes) => (
                <SelectItem key={mes.value} value={mes.value}>{mes.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setMesFinal} defaultValue={mesFinal}>
            <SelectTrigger className="w-1/3 border-laranjajava">
              <SelectValue placeholder="Mês Final" />
            </SelectTrigger>
            <SelectContent>
              {meses.map((mes) => (
                <SelectItem key={mes.value} value={mes.value}>{mes.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {mensagem ? (
          <p className="text-center text-gray-500">{mensagem}</p>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="anoMes"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="totalVendas" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        {mesAnoMaisPedidos && (
          <div className="text-laranjajava font-medium">
            Período com mais pedidos: {mesAnoMaisPedidos}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}