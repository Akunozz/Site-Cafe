import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router'

function TelaLogin() {
  // Permite valores nulos usando o tipo `string | null` e `number | null`
  const [nome, setNome] = useState<string | null>(null);
  const [idade, setIdade] = useState<number | null>(null);

  return (
    <>
      <div className='flex justify-center h-screen items-center'>
        <div className='space-y-2'>
          <Input
            placeholder='Insira seu nome'
            value={nome ?? ''} // Exibe string vazia se `nome` for nulo
            onChange={event => setNome(event.target.value || null)} // Define como `null` se vazio
          />
          <Input
            placeholder='Insira sua idade'
            value={idade ?? ''}
            onChange={event => setIdade(event.target.value ? parseInt(event.target.value, 10) : null)}
          />

          <div className='space-x-2'>
            <Button className='bg-green-600' onClick={() => setIdade((prev) => (prev !== null ? prev + 1 : 1))}>
              Aumentar idade
            </Button>

            <Button className='bg-red-600' onClick={() => setIdade((prev) => (prev !== null && prev > 0 ? prev - 1 : 0))}>
              Diminuir idade
            </Button>

            <Button variant="outline" onClick={() => {
              setNome(null);    // Limpa o nome
              setIdade(null);   // Limpa a idade
            }}>
              Limpar Dados
            </Button>
          </div>
          <p className='flex justify-center'>
            {nome ? `Seu nome é ${nome}` : 'Nome não informado'} <br />
            {idade !== null ? `e você tem ${idade} anos.` : 'Idade não informada.'}
          </p>
          <div className='flex justify-center'>
            <Link to="/tela2">
            <Button className='bg-gradient-to-r from-violet-500 via-blue-500 to-rose-300
             hover:from-red-500 hover:via-yellow-300 hover:to-green-400 border-none text-white 
             font-bold'>Ir para outra página</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default TelaLogin;
