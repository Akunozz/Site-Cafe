import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pessoaSchema } from "../../schemas/pessoaSchema";
import Botao from "../Botao";
import pessoaService from "../../services/PessoaService";
import IPessoa from "../../interfaces/IPessoa";

// Tipo para os dados do formulário

const FormularioCadastroCliente = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPessoa>({
    resolver: zodResolver(pessoaSchema), // Resolver do Zod para validação
  });

  const onSubmit = async (data: IPessoa) => {
    try {
      const clienteCadastrado = await pessoaService.postAdicionarDados(data);
      if (clienteCadastrado) {
        alert("Cliente cadastrado com sucesso!");
        reset(); // Limpa o formulário após sucesso
      } else {
        alert("Erro ao cadastrar cliente.");
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao enviar os dados.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Nome */}
      <div>
        <label className="formulario-label">Nome:</label>
        <input
          type="text"
          {...register("nome")}
          placeholder="Digite o nome"
          className="formulario-campo"
        />
        {errors.nome && (
          <p className="text-red-500 text-sm">{errors.nome.message}</p>
        )}
      </div>

      {/* Setor */}
      <div>
        <label className="formulario-label">Setor:</label>
        <input
          type="text"
          {...register("setor")}
          placeholder="Digite o setor"
          className="formulario-campo"
        />
        {errors.setor && (
          <p className="text-red-500 text-sm">{errors.setor.message}</p>
        )}
      </div>

      {/* Usuário */}
      <div>
        <label className="formulario-label">Usuário:</label>
        <input
          type="text"
          {...register("usuario")}
          placeholder="Digite o nome de usuário"
          className="formulario-campo"
        />
        {errors.usuario && (
          <p className="text-red-500 text-sm">{errors.usuario.message}</p>
        )}
      </div>

      {/* Senha */}
      <div>
        <label className="formulario-label">Senha:</label>
        <input
          type="password"
          {...register("senha")}
          placeholder="Digite a senha"
          className="formulario-campo"
        />
        {errors.senha && (
          <p className="text-red-500 text-sm">{errors.senha.message}</p>
        )}
      </div>

      {/* Permissão */}
      <div>
        <label className="formulario-label">Permissão:</label>
        <select
          {...register("permissao")}
          className="formulario-campo"
        >
          <option value="ADMIN">Administrador</option>
          <option value="AUX">Auxiliar</option>
          <option value="USER">Usuário Comum</option>
        </select>
        {errors.permissao && (
          <p className="text-red-500 text-sm">{errors.permissao.message}</p>
        )}
      </div>

      {/* Botão de Submit */}
      <Botao text="Cadastrar" />
    </form>
  );
};

export default FormularioCadastroCliente;
