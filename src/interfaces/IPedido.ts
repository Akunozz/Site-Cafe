interface IPedido {
    id: number;
    bebida_id: number;
    cliente_id: number;
    unitario: string;
    total: string;
    data_compra: string;
    quantidade: number;
    }

    export default IPedido;