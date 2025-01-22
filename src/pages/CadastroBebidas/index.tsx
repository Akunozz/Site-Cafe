import NavBar from "../../components/NavBar";
import FormularioCadastroBebidas from "../../components/FormularioCadastroBebidas";

function CadastroBebidas() {
  const handleFormSubmit = (data: any) => {
    console.log("Dados enviados:", data);
    alert("Cadastro de bebida realizado com sucesso!");
  };

  return (
    <div className="navbar">
      {/* NavBar */}
      <NavBar />

      {/* Conteúdo da página */}
      <div className="flex-1 flex justify-center items-center bg-preto p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl sm:max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-azuljava">
            Cadastro de Bebida
          </h1>

          {/* Formulário de Cadastro da Bebida */}
          <FormularioCadastroBebidas onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
}

export default CadastroBebidas;