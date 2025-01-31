interface IPessoa {
    id: string,
    nome: string,
    setor: {
        id: string,
        nome: string
    },
    imagem: `data:image/${string};base64,${string}` | null,
    usuario: string,
    senha: string,
    permissao: "ADMIN" | "USER" | "AUX",
    status: "Ativo" | "Inativo"
}

export default IPessoa;