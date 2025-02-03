interface ILogin{
    pessoa: {
        id: number;
        nome: string;
        usuario: string;
        permissao: string;
        setor: string;
        imagem: string;
        pedidosNoMes: string | null;
    };
    token: string;
    tipo: string;
}

export default ILogin