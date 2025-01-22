import IPessoa from "./IPessoa";

interface IPessoaid extends Omit<IPessoa, "setor"> {
    setor_id: string
}	

export default IPessoaid;