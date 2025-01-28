import { z } from "zod";

export const pedidosEditarSchema = z.object({
    bebida_id: z.coerce.number().min(1, "Selecione uma bebida"),
    quantidade: z.coerce.number().positive("A quantidade deve ser maior que zero"),
});