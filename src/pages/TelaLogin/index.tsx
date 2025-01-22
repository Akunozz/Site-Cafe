import { useRouter } from "@tanstack/react-router";
import FormularioLogin from "../../components/FormularioLogin/index";
import cafe from "../../assets/imagens/cafe.png";

function TelaLogin() {
  const router = useRouter();

  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Dados enviados:", data);

    // Redireciona para a tela inicial após login
    router.navigate({ to: "/inicial" });
  };

  return (
    <div className="min-h-screen bg-preto flex items-center justify-center px-4 sm:px-8 lg:px-16">
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        {/* Imagem decorativa */}
        <img
          src={cafe}
          alt="Café"
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 mx-auto mb-6 lg:mb-2 mt-1"
        />
        <div className="bg-zinc-50 p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-azuljava text-center mb-4 sm:mb-6 lg:mb-8">
            Login
          </h1>
          <FormularioLogin onSubmit={handleLogin} />
        </div>
      </div>
    </div>
  );
}

export default TelaLogin;