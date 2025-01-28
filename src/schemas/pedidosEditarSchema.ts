import { z } from "zod";

export const pedidosEditarSchema = z.object({
    bebida_id: z.coerce.number().min(1, "A bebida deve ser obrigatória"),
    quantidade: z.coerce.number().positive("A quantidade deve ser maior que zero"),
});