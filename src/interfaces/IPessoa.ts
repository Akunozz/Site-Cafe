interface IPessoa {
    id: string,
    nome: string,
    setor: {
        id: string,
        nome: string
    },
    usuario: string,
    senha: string,
    permissao: "ADMIN" | "USER" | "AUX"
}

export default IPessoa;