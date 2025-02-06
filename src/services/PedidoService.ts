import ApiService from "./ApiService";
import IPedido from "../interfaces/IPedido";

class PedidoService extends ApiService<IPedido> {
    constructor() {
        super("pedidos");
    }
}

export default new PedidoService();