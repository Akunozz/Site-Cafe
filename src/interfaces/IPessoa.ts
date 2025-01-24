interface IPessoa {
    id: string,
    nome: string,
    setor: {
        id: string,
        nome: string
    },
    imagem: string,
    usuario: string,
    senha: string,
    permissao: "ADMIN" | "USER" | "AUX"
}

export default IPessoa;