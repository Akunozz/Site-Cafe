import NavBar from "../../components/NavBar";
import FormularioCadastroCliente from "../../components/FormularioCadastroCliente";

function TelaCadastro() {
  return (
    <div className="navbar">
      {/* NavBar */}
      <NavBar />

      {/* Conteúdo da página */}
      <div className="flex-1 flex justify-center items-center bg-preto p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6 text-center text-azuljava">
            Cadastro de Pessoa
          </h1>

          {/*Formulario de Cadastro do Cliente */}
          <FormularioCadastroCliente/>
        </div>
      </div>
    </div>
  );
}

export default TelaCadastro;
