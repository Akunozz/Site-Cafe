import { useRouter } from "@tanstack/react-router";
import FormularioLogin from "../../components/FormularioLogin/formularioLogin";
import cafe from "../../assets/imagens/cafe.png";
import cafe_fundo from "../../assets/imagens/cafe_fundo.jpg"

function TelaLogin() {
  const router = useRouter();

  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Dados enviados:", data);

    // Redireciona para a tela inicial após login
    router.navigate({ to: "/inicial" });
  };

  return (
    <div  className="min-h-screen bg-center flex items-center justify-center"
    style={{ backgroundImage: `url(${cafe_fundo})`}}>
      <div>
        <div className="bg-zinc-50 p-8 rounded-3xl shadow-lg">
        <img
          src={cafe}
          alt="Café"
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 mx-auto mb-6 lg:mb-2"
        />
          <h1 className="text-2xl font-bold text-azuljava text-center mt-5 mb-2">
            Login
          </h1>
          <div className="w-80">
          <FormularioLogin onSubmit={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TelaLogin;