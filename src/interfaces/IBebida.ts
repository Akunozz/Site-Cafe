interface IBebida {
    id: string,
    nome: string,
    descricao: string,
    preco: number,
    imagem: `data:image/${string};base64,${string}` | null,
    quantidade: number,
    status: "Ativo" | "Inativo"
}

export default IBebida;