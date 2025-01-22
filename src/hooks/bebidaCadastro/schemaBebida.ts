import { z } from "zod";

export const bebidaSchema = z.object({
    nome: z.string().min(3, {message: "Nome da bebida deve ter no mínimo 3 caracteres"}),
    preco: z.number(),
    quantidade: z.number(),
    status: z.string(),
    });

export type bebidaSchema = z.infer<typeof bebidaSchema>;

