//componente utilizado na listagem de clientes para gerar uma tabela de setores com opçao para exluir caso
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Eye, CirclePlus, Trash2 } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import SetorService from "@/services/SetorService"
import ISetores from "@/interfaces/ISetores"
import Tabela from "../Tabela/tabela"
import { toast } from "sonner"

function BotaoSetores() {
  const [setores, setSetores] = useState<ISetores[]>([])
  const [novoSetor, setNovoSetor] = useState("")
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [paginaAtual, setPaginaAtual] = useState(1)

  useEffect(() => {
    async function fetchSetores() {
      try {
        const response = await SetorService.getListarDados()
        setSetores(response)
      } catch (error) {
        console.error("Erro ao buscar setores:", error)
      }
    }
    fetchSetores()
  }, [])

  const handleCadastrarSetor = async () => {
    if (!novoSetor.trim()) return
    const setorCriado = await SetorService.postAdicionarDados({ nome: novoSetor })
    if (setorCriado) {
      setSetores((prev) => [...prev, setorCriado])
      setNovoSetor("")
      setIsPopoverOpen(false)
      toast.success("Setor cadastrado com sucesso!")
    }
  }

  const excluirSetor = async (setor: ISetores) => {
    if (window.confirm("Tem certeza que deseja excluir este setor?")) {
      try {
        const setorDeletado = await SetorService.deleteDados(setor.id)
        if (setorDeletado) {
          setSetores((prev) => prev.filter((s) => s.id !== setor.id))
        } else {
          alert("Setor em uso, não é possível deletar")
        }
      } catch (error) {
        console.error(error)
        alert("Ocorreu um erro ao excluir o setor.")
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-azuljava hover:bg-laranjajava p-5 text-base">
          <Eye className="mr-1" />
          Visualizar Setores
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-azuljava font-bold">Setores Cadastrados</DialogTitle>
        </DialogHeader>
        {setores.length > 0 ? (
          <Tabela
            colunas={["Setor", "Deletar"]}
            dados={setores}
            paginaAtual={paginaAtual}
            setPaginaAtual={setPaginaAtual}
            itensTabela={(setor) => (
              <>
                <td>{setor.nome}</td>
                <td>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => excluirSetor(setor)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </>
            )}
          />
        ) : (
          <p className="text-center text-gray-500">Nenhum setor cadastrado.</p>
        )}
        <div className="flex items-center justify-center">
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button className="bg-azuljava hover:bg-laranjajava p-3 ">
              <CirclePlus /> Cadastrar Novo Setor
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4 space-y-2">
            <label className="block text-sm font-medium text-laranjajava">Nome do setor</label>
            <input
              type="text"
              value={novoSetor}
              onChange={(e) => setNovoSetor(e.target.value)}
              className="formulario-campo"
            />
            <Button className="bg-azuljava hover:bg-laranjajava" onClick={handleCadastrarSetor}>
              Salvar
            </Button>
          </PopoverContent>
        </Popover>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BotaoSetores
