import { z } from "zod";

export const pedidosEditarSchema = z.object({
    bebida_id: z.number(),
    quantidade: z.number().positive("A quantidade deve ser maior que zero"),
});