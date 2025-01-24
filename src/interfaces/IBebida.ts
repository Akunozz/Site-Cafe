interface IBebida {
    id: string,
    nome: string,
    preco: number,
    imagem: string,
    quantidade: number,
    status: "Ativo" | "Inativado"
}

export default IBebida;