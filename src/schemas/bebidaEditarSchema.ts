import { z } from "zod";

export const bebidaEditarSchema = z.object({
    nome: z.string().min(1, "O nome é obrigatório"),
    preco: z.number().positive("O preço deve ser maior que zero"),
    imagem: z.string().optional(),
    status: z.enum(["Ativo", "Inativo"]),
});