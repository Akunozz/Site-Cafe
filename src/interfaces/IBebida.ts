interface IBebida {
    id: string,
    nome: string,
    preco: number,
    imagem: string,
    quantidade: number,
    status: "ATIVO" | "INATIVO"
}

export default IBebida;