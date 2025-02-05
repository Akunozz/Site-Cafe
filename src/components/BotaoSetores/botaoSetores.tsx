//componente utilizado na listagem de clientes para gerar uma tabela de setores com opçao para exluir caso
import { Button } from "@/components/ui/button"
import { Eye, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import SetorService from "@/services/SetorService"
import ISetores from "@/interfaces/ISetores"
import Tabela from "../Tabela/tabela"

function BotaoSetores() {
  const [setores, setSetores] = useState<ISetores[]>([]); //amazena setores
  const [setoresFiltrados, setSetoresFiltrados] = useState<ISetores[]>([]); //não possui pesquisa de setor, mas na tabela é obrigatório esse prop
  const [userPermission, setUserPermission] = useState<string | null>(null); //permissão do usuário

  // busca os setores
  useEffect(() => {
    async function fetchSetores() {
      try {
        const response = await SetorService.getListarDados()
        setSetores(response)
        setSetoresFiltrados(response)
      } catch (error) {
        console.error("Erro ao buscar setores:", error)
      }
    }
    fetchSetores()
  }, []);

  // permissão
  useEffect(() => {
    const perm = localStorage.getItem("permissao")
    setUserPermission(perm)
  }, []);

  // excluir setor
  const excluirSetor = async (setor: ISetores) => {
    if (window.confirm("Tem certeza que deseja excluir este setor?")) {
      try {
        const setorDeletado = await SetorService.deleteDados(setor.id)
        if (setorDeletado) {
          const setoresAtualizados = setores.filter((c) => c.id !== setor.id)
          setSetores(setoresAtualizados)
          setSetoresFiltrados(setoresAtualizados)
        } else {
          alert("Setor em uso, não é possível deletar")
        }
      } catch (error) {
        console.error(error)
        alert("Ocorreu um erro ao excluir o setor.")
      }
    }
  };

  // colunas tabela
  const colunas = ["Setor", "Deletar"];

  // itens tabela
  const itensTabela = (setor: ISetores) => (
    <>
      <td>{setor.nome}</td>
      <td>
          <Button
            variant="destructive"
            size="sm"
            onClick={() =>
              userPermission === "ADMIN"
                ? excluirSetor(setor)
                : alert("Você não tem permissão para excluir este setor.")
            }
            type="button"
          >
            <Trash2 size={16} />
          </Button>
      </td>
    </>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-azuljava hover:bg-laranjajava transition-all duration-300 p-5 text-base">
          <Eye className="mr-1" />
          Visualizar Setores
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center text-azuljava font-bold">Setores Cadastrados</DialogTitle>
        </DialogHeader>
        {setoresFiltrados.length > 0 ? (
          <Tabela colunas={colunas} dados={setoresFiltrados} itensTabela={itensTabela} />
        ) : (
          <p className="text-center text-gray-500">Nenhum setor cadastrado.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default BotaoSetores
