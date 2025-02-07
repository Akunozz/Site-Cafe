//gráfico bebidas mais vendidas por período utilizado na tela inicial
import { useEffect, useState } from "react"
import { Pie, PieChart } from "recharts"
import BebidaRelatorioService from "@/services/BebidaRelatorioService"
import IBebidaRelatorio from "@/interfaces/IBebidaRelatorio"
import { Coffee } from "lucide-react"
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

const meses = [
  { value: "1", label: "Janeiro" }, { value: "2", label: "Fevereiro" }, { value: "3", label: "Março" },
  { value: "4", label: "Abril" }, { value: "5", label: "Maio" }, { value: "6", label: "Junho" },
  { value: "7", label: "Julho" }, { value: "8", label: "Agosto" }, { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" }, { value: "11", label: "Novembro" }, { value: "12", label: "Dezembro" },
];const anos = ["2024", "2025"];

export function GraficoBV() {
  const [chartData, setChartData] = useState<{ nome: string; vezesComprada: number; fill: string }[]>([]); // armazena os dados no gráfico
  const [mesSelecionado, setMesSelecionado] = useState("1"); //mes para filtro
  const [anoSelecionado, setAnoSelecionado] = useState("2024"); //ano para filtro
  const [mensagem, setMensagem] = useState<string | null>(null); //mensagem se não tiver dados
  const [bebidaMaisVendida, setBebidaMaisVendida] = useState<{ nome: string; imagem?: string } | null>(null); //armazena bebida mais vendida

  //busca dados do relatório
  useEffect(() => {
    async function fetchData() {
      try {
        const response: IBebidaRelatorio[] = await BebidaRelatorioService.getListarDados(
          Number(mesSelecionado),
          Number(anoSelecionado)
        )

        if (response.length === 0) {
          setChartData([]);
          setMensagem("Nenhuma bebida foi vendida neste período.");
          setBebidaMaisVendida(null);
        } else {
          const colors = ["#4F46E5", "#EC4899", "#F59E0B", "#10B981", "#8B5CF6", "#ade4b5",
            "#ffabab", "#ffdaab", "#ddffab", "#abe4ff", "#d9abff"];

          const dataFormatted = response.map((pedido, index) => ({
            nome: pedido.nome,
            vezesComprada: pedido.quantidade,
            fill: colors[index % colors.length],
          }));

          setChartData(dataFormatted);
          setMensagem(null);

          const bebidaMaisVendida = response.reduce((max, pedido) =>
            pedido.quantidade > max.quantidade ? pedido : max
          );

          setBebidaMaisVendida({
            nome: bebidaMaisVendida.nome,
            imagem: bebidaMaisVendida.imagem || "",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados do relatório:", error);
        setMensagem("Erro ao carregar os dados.");
      }
    }
    fetchData();
  }, [mesSelecionado, anoSelecionado]);

  //definição do gráfico
  const chartConfig = {
    vezesComprada: {
      label: "Quantidade de bebidas vendidas",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-5">
        <CardTitle>Bebidas mais vendidas em {meses.find(m => m.value === mesSelecionado)?.label} {anoSelecionado}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="flex justify-center gap-4 mb-4">
          <Select onValueChange={setMesSelecionado} defaultValue={mesSelecionado}>
            <SelectTrigger className="w-1/4 border-laranjajava">
              <SelectValue placeholder="Selecione o mês" />
            </SelectTrigger>
            <SelectContent>
              {meses.map((mes) => (
                <SelectItem key={mes.value} value={mes.value}>{mes.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setAnoSelecionado} defaultValue={anoSelecionado}>
            <SelectTrigger className="w-1/4 border-laranjajava">
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent>
              {anos.map((ano) => (
                <SelectItem key={ano} value={ano}>{ano}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        { mensagem ? (
          <p className="text-center text-gray-500">{mensagem}</p>
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="vezesComprada" nameKey="nome" label={({ value }) => value} />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {bebidaMaisVendida && (
          <div className="flex flex-col items-center">
            <div className="text-laranjajava font-medium">Bebida mais vendida: {bebidaMaisVendida.nome}</div>
            {bebidaMaisVendida.imagem ? (
              <img
                src={bebidaMaisVendida.imagem}
                alt={bebidaMaisVendida.nome}
                className="w-28 h-28 mt-2 rounded-lg shadow-md"
              />
            ) : (
              <Coffee className="w-24 h-24 text-azuljava mx-auto" />
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
