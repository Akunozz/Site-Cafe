import { useForm } from "react-hook-form";
import { bebidaSchema } from "./schemaBebida";
import { z } from "zod";

export default function HookBebidas(dadosBebida : bebidaSchema) {

    const form = useForm({
        resolver: zodResolver(bebidaSchema),
    });
