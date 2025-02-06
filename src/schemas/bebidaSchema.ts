import { z } from "zod";

export const bebidaSchema = z.object({
    nome: z.string().nonempty("Por favor, insira um nome"),
    preco: z.coerce.number()
        .positive("O preço deve ser maior que zero")
        .multipleOf(0.01, "O preço deve ter no máximo duas casas decimais"),
    imagem: z.any().optional(),
    descricao: z.string().optional(),
    status: z.any().refine(val => val !== undefined, { message: "Selecione um status" })
})