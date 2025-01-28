import { z } from "zod";

export const pedidosSchema = z.object({
    bebida_id: z.coerce.number().min(1, "A bebida deve ser obrigatória"),
    cliente_id: z.number(),
    unitario: z.number(),
    data_compra: z.string(),
    quantidade: z.coerce.number().positive("A quantidade deve ser maior que zero"),
});