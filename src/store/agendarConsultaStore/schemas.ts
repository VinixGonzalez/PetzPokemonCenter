import { z } from "zod";

export const agendarConsultaSchema = z.object({
  nome: z
    .string()
    .nonempty("O nome é obrigatório.")
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .max(30, "O nome deve ter no máximo 30 caracteres."),
  sobrenome: z
    .string()
    .nonempty("O sobrenome é obrigatório.")
    .min(3, "O sobrenome deve ter no mínimo 3 caracteres.")
    .max(50, "O sobrenome deve ter no máximo 50 caracteres."),
  regiao: z
    .string({ required_error: "A região é obrigatória." })
    .nonempty("A região é obrigatória."),
  cidade: z
    .string({ required_error: "A cidade é obrigatória." })
    .nonempty("A cidade é obrigatória."),
  datasAtendimento: z
    .string({ required_error: "Selecione uma data de atendimento." })
    .nonempty("Selecione uma data de atendimento."),
  horariosAtendimento: z
    .string({ required_error: "Selecione um horário de atendimento." })
    .nonempty("Selecione um horário de atendimento."),
});

export type AgendarConsultaFormSchemaType = z.infer<
  typeof agendarConsultaSchema
>;
