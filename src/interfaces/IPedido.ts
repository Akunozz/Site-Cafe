interface IPedido {
    id: string;
    bebida_id: number;
    cliente_id: number;
    unitario: number;
    total: number;
    data_compra: string;
    quantidade: number;
    }

    export default IPedido;