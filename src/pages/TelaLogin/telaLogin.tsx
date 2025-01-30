import { LoginForm } from "@/components/FormularioLogin/login-form"
import cafe_fundo2 from "../../assets/imagens/cafe_fundo2.jpg"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-center"
      style={{ backgroundImage: `url(${cafe_fundo2})` }}>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
