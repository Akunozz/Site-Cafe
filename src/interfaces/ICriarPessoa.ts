interface ICriarPessoa {
  nome: string,
  imagem: string,
  usuario: string,
  senha: string,
  setor: {
    id: string,
    nome: string
  },
  permissao: "ADMIN" | "USER" | "AUX";
}

export default ICriarPessoa;