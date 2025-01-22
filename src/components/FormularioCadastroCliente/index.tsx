import React, { useState } from "react";
import { pessoaSchema } from "../../schemas/pessoaSchema";
import Botao from "../Botao";
import pessoaService from "../../services/PessoaService";


const FormularioCadastroCliente = () => {
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [permissao, setPermissao] = useState<"USER" | "ADMIN" | "AUX">("USER");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dados = {
      nome,
      setor: {
        id: "1",
        nome: setor,
      },
      usuario,
      senha,
      permissao,
    };

    // Validação com Zod
    const validation = pessoaSchema.safeParse(dados);

    if (!validation.success) {
      const erros = validation.error.errors.map(err => err.message).join("\n");
      alert(`Erros de validação:\n${erros}`);
      return;
    }

    try {
      const clienteCadastrado = await pessoaService.cadastrarCliente(dados);
      if (clienteCadastrado) {
        alert("Cliente cadastrado com sucesso!");
        setNome("");
        setSetor("");
        setUsuario("");
        setSenha("");
        setPermissao("USER");
      } else {
        alert("Erro ao cadastrar cliente.");
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao enviar os dados.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="formulario-label">Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome"
          className="formulario-campo"
        />
      </div>

      <div>
        <label className="formulario-label">Setor:</label>
        <input
          type="text"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
          placeholder="Digite o setor"
          className="formulario-campo"
        />
      </div>

      <div>
        <label className="formulario-label">Usuário:</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Digite o nome de usuário"
          className="formulario-campo"
        />
      </div>

      <div>
        <label className="formulario-label">Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite a senha"
          className="formulario-campo"
        />
      </div>

      <div>
        <label className="formulario-label">Permissão:</label>
        <select
          value={permissao}
          onChange={(e) => setPermissao(e.target.value as "USER" | "ADMIN" | "AUX")}
          className="formulario-campo"
        >
          <option value="ADMIN">Administrador</option>
          <option value="AUX">Auxiliar</option>
          <option value="USER">Usuário Comum</option>
        </select>
      </div>

      <Botao text="Cadastrar" />
    </form>
  );
};

export default FormularioCadastroCliente;