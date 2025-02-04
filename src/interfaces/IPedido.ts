interface IPedido {
    id: string;
    bebida_id: number;
    cliente_id: number;
    unitario: number;
    total: number;
    data_compra: string;
    quantidade: number;
    cliente?: {
        id: number;
        nome: string;
    };
    bebida?: {
        id: number;
        nome: string;
        preco: number;
    };
    anoMes: string;
        totalVendas: number;
}
export default IPedido;