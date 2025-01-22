import { useState } from "react";
import Botao from "../Botao";

interface FormularioCadastroBebidasProps {
  onSubmit: (data: any) => void;
}

const FormularioCadastroBebidas = ({ onSubmit }: FormularioCadastroBebidasProps) => {
  const [foto, setFoto] = useState<File | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [status, setStatus] = useState(false);

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (status) {
      setPreco("2.30"); // Atribui o preço padrão se o checkbox estiver marcado
    }

    // Envia os dados para o componente pai
    onSubmit({
      foto,
      nome,
      descricao,
      preco,
      status,
    });

    alert("Cadastro de bebida realizado com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Foto */}
      <div>
        <label className="formulario-label">Foto:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFotoUpload}
          className="block w-full text-sm text-preto file:mr-4 file:py-2 file:px-4 file:rounded-lg 
            file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
      </div>

      {/* Nome */}
      <div>
        <label className="formulario-label">Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome da bebida"
          className="formulario-campo"
        />
      </div>

      {/* Descrição */}
      <div>
        <label className="formulario-label">Descrição:</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite uma descrição da bebida"
          className="formulario-campo"
        />
      </div>

      {/* Preço */}
      <div>
        <label className="formulario-label">Preço:</label>
        <input
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="Digite o preço da bebida"
          className="formulario-campo"
        />
      </div>

      {/* Status (checkbox) */}
      <div>
        <label className="flex text-sm font-medium items-center text-laranjajava">
          <input
            type="checkbox"
            checked={status}
            onChange={() => setStatus(!status)}
            className="mr-2"
          />
          Atribuir preço padrão de R$ 2,30
        </label>
      </div>

      {/* Botão de Cadastro */}
      <Botao text="Cadastrar"></Botao>
    </form>
  );
};

export default FormularioCadastroBebidas;