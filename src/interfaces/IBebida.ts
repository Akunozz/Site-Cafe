interface IBebida {
    id: string,
    nome: string,
    preco: number,
    descricao: string,
    imagem: `data:image/${string};base64,${string}` | null,
    quantidade: number,
    status: "Ativo" | "Inativo"
}

export default IBebida;