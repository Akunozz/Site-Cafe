//componente utilizado na listagem de pedidos para gerar um relaorio de pedidos filtrados por mes
import { Button } from "@/components/ui/button"
import { ClipboardPlus, Download } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import PedidosRelatorioService from "@/services/PedidosRelatorioService"
import IPedidoRelatorio from "@/interfaces/IPedidoRelatorio"
import Tabela from "../Tabela/tabela"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function BotaoPedido() {
  const [pedidos, setPedidos] = useState<IPedidoRelatorio[]>([]); //contem os pedidos de acordo com o filtro
  const [loading, setLoading] = useState(true); //tela carregamento
  const [mesSelecionado, setMesSelecionado] = useState("1"); // meses do filtro
  const [anoSelecionado, setAnoSelecionado] = useState("2024"); // anos do filtro

  const meses = [
    { value: "1", label: "Janeiro" }, { value: "2", label: "Fevereiro" }, { value: "3", label: "Março" },
    { value: "4", label: "Abril" }, { value: "5", label: "Maio" }, { value: "6", label: "Junho" },
    { value: "7", label: "Julho" }, { value: "8", label: "Agosto" }, { value: "9", label: "Setembro" },
    { value: "10", label: "Outubro" }, { value: "11", label: "Novembro" }, { value: "12", label: "Dezembro" },
  ];
  const anos = ["2024", "2025"];

  //busca pedidos com base no mês e ano selecionados
  const fetchPedidos = async () => {
    setLoading(true);
    try {
      const response = await PedidosRelatorioService.getRelatorio(mesSelecionado, anoSelecionado);
      setPedidos(response);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  //busca os pedidos e atualiza sempre que modificado
  useEffect(() => {
    fetchPedidos();
  }, [mesSelecionado, anoSelecionado]);

  // Função para baixar os pedidos em CSV
  const baixarRelatorioCSV = () => {
    if (pedidos.length === 0) {
      alert("Nenhum pedido disponível para exportação.");
      return;
    }
    const csvHeader = "Período,Cliente,Quantidade,Valor Total\n";
    const csvRows = pedidos.map((pedido) =>
      `${pedido.mesAno},${pedido.cliente},${pedido.vezesComprou},${pedido.valorTotal}`
    );
    const csvContent = csvHeader + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio_pedidos_${mesSelecionado}_${anoSelecionado}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  //colunas da tabela
  const colunas = ["Período", "Cliente", "Quantidade", "Valor Total"];
  //itens da tabela
  const itensTabela = (pedido: IPedidoRelatorio) => (
    <>
      <td className="p-2">{pedido.mesAno}</td>
      <td>{pedido.cliente}</td>
      <td>{pedido.vezesComprou}</td>
      <td>{pedido.valorTotal}</td>
    </>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-azuljava hover:bg-laranjajava transition-all duration-300 p-5 text-base">
          <ClipboardPlus className="mr-1" />
          Relatório de Pedidos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[80vh] w-full flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-azuljava font-bold text-2xl">Pedidos</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col overflow-y-auto flex-1 px-4">
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
              <SelectTrigger className="w-1/6 border-laranjajava">
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>
              <SelectContent>
                {anos.map((ano) => (
                  <SelectItem key={ano} value={ano}>{ano}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {loading ? (
            <div className="flex flex-col gap-4">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="w-full h-[40px] rounded-md" />
              ))}
            </div>
          ) : pedidos.length > 0 ? (
            <Tabela colunas={colunas} dados={pedidos} itensTabela={itensTabela} />
          ) : (
            <p className="text-center text-gray-500">Nenhum pedido encontrado para este período.</p>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Button
            onClick={baixarRelatorioCSV}
            className="bg-green-600 hover:bg-green-700 transition-all duration-300 p-4 text-base flex items-center gap-2"
          >
            <Download size={18} />
            Baixar Relatório
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BotaoPedido
