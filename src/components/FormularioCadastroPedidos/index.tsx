import { useState } from "react";
import Botao from "../Botao";
interface FormularioCadastroPedidosProps {
  clientes: any[];
  bebidas: any[];
  onSubmit: (data: any) => void;
}

const FormularioCadastroPedidos = ({
  clientes,
  bebidas,
  onSubmit,
}: FormularioCadastroPedidosProps) => {
  const [cliente, setCliente] = useState<string>("");
  const [bebida, setBebida] = useState<string>("");
  const [quantidade, setQuantidade] = useState<number>(1);
  const [preco, setPreco] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [dataCompra, setDataCompra] = useState<string>(new Date().toISOString().split("T")[0]);

  const handleBebidaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bebidaSelecionada = bebidas.find((bebida) => bebida.id === +e.target.value);
    setBebida(e.target.value);
    setPreco(bebidaSelecionada?.preco.toString() || "");
  };

  const handleQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qtd = parseInt(e.target.value, 10);
    setQuantidade(qtd);
    setTotal(parseFloat(preco) * qtd);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      cliente,
      bebida,
      quantidade,
      preco,
      total,
      dataCompra,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cliente */}
      <div>
        <label className="formulario-label">Cliente:</label>
        <select
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          className="formulario-campo"
        >
          <option value="">Selecione um cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Bebida */}
      <div>
        <label className="formulario-label">Bebida:</label>
        <select
          value={bebida}
          onChange={handleBebidaChange}
          className="formulario-campo"
        >
          <option value="">Selecione uma bebida</option>
          {bebidas.map((bebida) => (
            <option key={bebida.id} value={bebida.id}>
              {bebida.nome} - R$ {bebida.preco}
            </option>
          ))}
        </select>
      </div>

      {/* Preço */}
      <div>
        <label className="formulario-label">Preço:</label>
        <input
          type="text"
          value={preco}
          disabled
          className="formulario-campo"
        />
      </div>

      {/* Quantidade */}
      <div>
        <label className="formulario-label">Quantidade:</label>
        <input
          type="number"
          value={quantidade}
          onChange={handleQuantidadeChange}
          min="1"
          className="formulario-campo"
        />
      </div>

      {/* Total */}
      <div>
        <label className="formulario-label">Total:</label>
        <input
          type="text"
          value={total.toFixed(2)}
          disabled
          className="formulario-campo"
        />
      </div>

      {/* Data de Compra */}
      <div>
        <label className="formulario-label">Data de Compra:</label>
        <input
          type="date"
          value={dataCompra}
          onChange={(e) => setDataCompra(e.target.value)}
          className="formulario-campo"
        />
      </div>

      {/* Botão de Cadastro */}
      <Botao text="Cadastar"></Botao>
    </form>
  );
};

export default FormularioCadastroPedidos;
