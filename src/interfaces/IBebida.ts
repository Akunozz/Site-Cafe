interface IBebida {
    id: string,
    nome: string,
    preco: number,
    imagem: string,
    quantidade: number,
    status: "Ativo" | "Inativo"
}

export default IBebida;