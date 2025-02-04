import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import SetorService from "@/services/SetorService";
import ISetores from "@/interfaces/ISetores";
import Tabela from "../Tabela/tabela";
import { Skeleton } from "@/components/ui/skeleton";

function BotaoSetores() {
  const [setores, setSetores] = useState<ISetores[]>([]);
  const [setoresFiltrados, setSetoresFiltrados] = useState<ISetores[]>([]);
  const [userPermission, setUserPermission] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Busca os setores ao montar o componente
  useEffect(() => {
    async function fetchSetores() {
      try {
        const response = await SetorService.getListarDados();
        setSetores(response);
        setSetoresFiltrados(response);
      } catch (error) {
        console.error("Erro ao buscar setores:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSetores();
  }, []);

  // Recupera a permissão do usuário
  useEffect(() => {
    const perm = localStorage.getItem("permissao");
    setUserPermission(perm);
  }, []);

  // Função para excluir um setor
  const excluirSetor = async (setor: ISetores) => {
    if (window.confirm("Tem certeza que deseja excluir este setor?")) {
      try {
        const setorDeletado = await SetorService.deleteDados(setor.id);
        if (setorDeletado) {
          const setoresAtualizados = setores.filter((c) => c.id !== setor.id);
          setSetores(setoresAtualizados);
          setSetoresFiltrados(setoresAtualizados);
        } else {
          alert("Setor em uso, não é possível deletar");
        }
      } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao excluir o setor.");
      }
    }
  };

  // Definição das colunas da tabela
  const colunas = ["Setor", "Deletar"];

  // Renderiza cada linha da tabela
  const renderLinha = (setor: ISetores) => (
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
        {loading ? (
          <div className="flex flex-col gap-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="w-full h-[40px] rounded-md" />
            ))}
          </div>
        ) : setoresFiltrados.length > 0 ? (
          <Tabela colunas={colunas} dados={setoresFiltrados} renderLinha={renderLinha} />
        ) : (
          <p className="text-center text-gray-500">Nenhum setor cadastrado.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default BotaoSetores;
