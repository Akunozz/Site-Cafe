import { z } from "zod";

export const bebidaSchema = z.object({
    nome: z.string().min(1, "O nome é obrigatório"),
    preco: z.coerce.number().positive("O preço deve ser maior que zero"),
    imagem: z.any().optional(),
    descricao: z.string().optional(),
    status: z.string().nonempty("Selecione um status"),
});