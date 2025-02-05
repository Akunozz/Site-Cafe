import { z } from "zod";

export const pessoaSchema = z.object({
  nome: z.string().min(1, "Insira um nome"),
  setor_id: z.any().refine(val => val !== undefined, { message: "Selecione um setor" }),
  imagem: z.any().optional(),
  usuario: z.string().min(1, "Insira um usuário"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  permissao: z.any().refine(val => val !== undefined, { message: "Selecione uma permissão" }),
  status: z.any().refine(val => val !== undefined, { message: "Selecione um status" }),
});