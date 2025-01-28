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
}
export default IPedido;