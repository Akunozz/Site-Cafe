import { z } from "zod";

export const pedidosSchema = z.object({
    bebida_id: z.string().min(1, "Selecione uma bebida"),
    cliente_id: z.string().min(1, "Selecione um cliente"),
    unitario: z.string(),
    data_compra: z.any(),
    quantidade: z.coerce.number().positive("A quantidade deve ser maior que zero"),
});