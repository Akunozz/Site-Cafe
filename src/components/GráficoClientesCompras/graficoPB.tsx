//gráfico clientes que mais compraram por período utilizado na tela inicial
import { useEffect, useState } from "react"
import { Pie, PieChart } from "recharts"
import PedidoRelatorioService from "@/services/ClienteRelatorioService"
import IPedidoRelatorio from "@/interfaces/IPessoaRelatorio"
import { CircleUserRound } from "lucide-react"
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

export function GraficoPB() {
  const [chartData, setChartData] = useState<{ nome: string; vezesComprou: number; fill: string }[]>([]); //armazena dados
  const [mesSelecionado, setMesSelecionado] = useState("1");  //meses para o filtro
  const [anoSelecionado, setAnoSelecionado] = useState("2024"); //anos para o filtro
  const [mensagem, setMensagem] = useState<string | null>(null);  ///mensagem se não tiver dados
  const [clienteMaisComprou, setClienteMaisComprou] = useState<{ nome: string; imagem: string } | null>(null);  //armazena cliente que mais comrpou

  //busca dados do relatório
  useEffect(() => {
    async function fetchData() {
      try {
        const response: IPedidoRelatorio[] = await PedidoRelatorioService.getListarDados(
          Number(mesSelecionado),
          Number(anoSelecionado)
        );

        if (response.length === 0) {
          setChartData([])
          setMensagem("Nenhum pedido foi realizado neste período.")
          setClienteMaisComprou(null)
        } else {
          const colors = [
            "#4F46E5", "#EC4899", "#F59E0B", "#10B981", "#8B5CF6", "#ade4b5",
            "#ffabab", "#ffdaab", "#ddffab", "#abe4ff", "#d9abff"
          ];

          const dataFormatted = response.map((pedido, index) => ({
            nome: pedido.nome,
            vezesComprou: pedido.vezesComprou,
            fill: colors[index % colors.length],
          }));

          setChartData(dataFormatted);
          setMensagem(null);

          // Encontrar o cliente com mais pedidos
          const clienteMaisComprou = response.reduce((max, pedido) =>
            pedido.vezesComprou > max.vezesComprou ? pedido : max
          );

          setClienteMaisComprou({
            nome: clienteMaisComprou.nome,
            imagem: clienteMaisComprou.imagem || "",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados do relatório:", error);
        setMensagem("Erro ao carregar os dados.");
      }
    }
    fetchData();
  }, [mesSelecionado, anoSelecionado]);

  //definção do gráfico
  const chartConfig = {
    vezesComprou: {
      label: "Quantidade de clientes que compraram bebidas",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-5">
        <CardTitle>Clientes que mais compraram bebidas em {meses.find(m => m.value === mesSelecionado)?.label} {anoSelecionado}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="flex gap-4 mb-4">
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
        {mensagem ? (
          <p className="text-center text-gray-500">{mensagem}</p>
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="vezesComprou" nameKey="nome" label={({ value }) => value} />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {clienteMaisComprou && (
          <div className="flex flex-col items-center">
          <div className="text-laranjajava font-medium">Cliente que mais comprou: {clienteMaisComprou.nome}</div>
          {clienteMaisComprou.imagem ? (
          <img 
          src={clienteMaisComprou.imagem} 
          alt={clienteMaisComprou.nome} 
          className="w-32 h-32 mt-2 rounded-lg shadow-md" />
          ) : (
              <CircleUserRound className="w-24 h-24 text-azuljava mx-auto" />
            )}
        </div>
        )}
      </CardFooter>
    </Card>
  );
}