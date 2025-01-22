import { z } from "zod";

export const pessoaSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório."),
  usuario: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres."),
  senha: z.string().min(3, "A senha deve ter pelo menos 3 caracteres."),
});

// Schema para validar o upload de arquivos
export const fotoSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, "A foto deve ter no máximo 5MB.") // Limita o tamanho a 5MB
  .refine(
    (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
    "A foto deve ser do tipo JPEG ou PNG."
  );