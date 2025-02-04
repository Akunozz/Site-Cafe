import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@tanstack/react-router"
import { loginSchema } from "@/schemas/loginSchema"
import AuthService from "@/services/AuthService"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import cafe from "../../assets/imagens/cafe.png"
import cafe_fundo2 from "../../assets/imagens/cafe_fundo2.jpg"

function TelaLogin() {
  const router = useRouter()
  const [mensagemErro, setMensagemErro] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ usuario: string; senha: string }>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: { usuario: string; senha: string }) => {
    try {
      if (!data.senha) {
        setMensagemErro("A senha é obrigatória.")
        return
      }
      const response = await AuthService.login(data)
      localStorage.setItem("token", response.token)
      localStorage.setItem("permissao", response.pessoa.permissao)
      localStorage.setItem("loginData", JSON.stringify(response))
      router.navigate({ to: "/inicial" })
    } catch (error) {
      setMensagemErro("Usuário ou senha inválidos. Tente novamente.")
    }
  };
  
  return (
    <div
      className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-center"
      style={{ backgroundImage: `url(${cafe_fundo2})` }}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex justify-center">Login</CardTitle>
              <CardDescription>
                <div className="flex justify-center pt-3">
                  <img className="max-w-20 max-h-20" src={cafe} alt="cafe java" />
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  {/* Campo Usuário */}
                  <div className="grid gap-2">
                    <Label className="text-azuljava" htmlFor="usuario">
                      Usuário
                    </Label>
                    <Input
                      className="border-laranjajava focus:ring-laranjajava"
                      id="usuario"
                      type="text"
                      placeholder="exemplo.exemplo"
                      {...register("usuario")}
                    />
                    {errors.usuario && (
                      <p className="text-red-500 text-sm">{errors.usuario.message}</p>
                    )}
                  </div>

                  {/* Campo Senha */}
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label className="text-azuljava" htmlFor="senha">
                        Senha
                      </Label>
                      <a
                        href=""
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Esqueceu a senha?
                      </a>
                    </div>
                    <Input
                      className="border-laranjajava focus:ring-laranjajava"
                      id="senha"
                      type="password"
                      placeholder="******"
                      {...register("senha")}
                    />
                    {errors.senha && (
                      <p className="text-red-500 text-sm">{errors.senha.message}</p>
                    )}
                  </div>

                  {/* Mensagem de erro */}
                  {mensagemErro && (
                    <p className="text-center text-red-500">{mensagemErro}</p>
                  )}

                  {/* Botão de Login */}
                  <Button type="submit" className="w-full bg-azuljava hover:bg-laranjajava">
                    Login
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Ainda não tem conta?{" "}
                  <a href="" className="underline underline-offset-4">
                    Cadastre-se
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TelaLogin