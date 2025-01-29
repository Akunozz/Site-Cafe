import { z } from "zod";

export const pedidosSchema = z.object({
    bebida_id: z.coerce.string().min(1, "Selecione uma bebida"),
    cliente_id: z.coerce.string().min(1, "Selecione um cliente"),
    unitario: z.coerce.string(),
    quantidade: z.coerce.number().positive("A quantidade deve ser maior que zero"),
    total: z.any(),
    data_compra: z.any()
});