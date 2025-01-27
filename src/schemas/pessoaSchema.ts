import { z } from "zod";

export const pessoaSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  setor_id: z.string().nonempty("O setor é obrigatório"),
  imagem: z.any().optional(),
  usuario: z.string().min(1, "O usuário é obrigatório"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  permissao: z.string().nonempty("A permissão é obrigatória"),
});