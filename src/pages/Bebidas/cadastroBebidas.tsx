import { useState } from "react"
import { fileToBase64 } from "../../utils/imageUtils"
import Formulario from "../../components/FormularioLayout/formularioLayout"
import PageLayout from "../../components/PageLayoutCadastro/pageLayout"
import { z } from "zod"
import bebidaService from "../../services/BebidaService"
import { bebidaSchema } from "../../schemas/bebidaSchema"
import { toast } from "sonner"

type Campo<T> = {
  id: keyof T
  label: string
  type: "number" | "text" | "file" | "checkbox" | "textarea" | "select" | "float"
  placeholder?: string
  defaultValue?: string | number | readonly string[] | undefined
  options?: { value: string, label: string }[]
  validation?: { valueAsNumber?: boolean }
}

//verificação dos campos
type BebidaForm = z.infer<typeof bebidaSchema>

const CadastroBebidas = () => {
  const [erros, setErros] = useState<Record<string, string>>({})
  
  const campos: Campo<BebidaForm>[] = [
    { id: "nome", label: "Nome", type: "text", placeholder: "Digite o nome da bebida" },
    { id: "imagem", label: "Imagem", type: "file" },
    { id: "descricao", label: "Descrição", type: "textarea", placeholder: "Descrição da bebida" },
    { id: "preco", label: "Preço", type: "float", placeholder: "Digite o preço" },
    { id: "status", label: "Status", type: "select", placeholder: "Selecione um status",
      options: [
        { value: "Ativo", label: "Ativo" },
        { value: "Inativo", label: "Inativo" },
      ]}
  ]

  const handleSubmit = async (data: any) => {
    try {
      setErros({})
      const validData = bebidaSchema.parse(data)

      let base64Image = ""
      if (validData.imagem) {
        const fileInput = (document.getElementById("imagem") as HTMLInputElement).files?.[0]
        if (fileInput) {
          if (fileInput.size > 1 * 1024 * 1024) {
            alert("A imagem deve ter no máximo 1MB.")
            return
          }
          base64Image = await fileToBase64(fileInput)
        }
      }

      const payload = {
        ...validData,
        imagem: base64Image as `data:image/${string};base64,${string}` || "",
        status: validData.status as "Ativo" | "Inativo",
      }

      const response = await bebidaService.postAdicionarDados(payload)
      if (response) {
        toast.success("Bebida cadastrada com sucesso!")
      } else {
        toast.error("Erro ao cadastrar bebida.")
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message
          }
        })
        setErros(fieldErrors)
      } else {
        toast.error("Ocorreu um erro ao salvar os dados.")
      }
    }
  }

  return (
    <PageLayout titulo="Cadastro de Bebida" rota="/listagem-bebidas">
      <Formulario 
      campos={campos} 
      onSubmit={(data) => handleSubmit(data)}
      erros={erros} />
    </PageLayout>
  )
}

export default CadastroBebidas
