import { z } from "zod";

export const pedidosSchema = z.object({
    bebida_id: z.any().refine(val => val !== undefined, { message: "Selecione uma bebida" }),
    cliente_id: z.any().refine(val => val !== undefined, { message: "Selecione um cliente" }),
    unitario: z.coerce.string(),
    quantidade: z.coerce.number().positive("A quantidade deve ser maior que zero"),
    total: z.any(),
    data_compra: z.any(),
});