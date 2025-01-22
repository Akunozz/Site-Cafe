import IPedido from "../interfaces/IPedido";
import ApiService from "./ApiService";

class PedidoService extends ApiService<IPedido> {
    constructor() {
        super("pedidos")
    }
}

export default new PedidoService();