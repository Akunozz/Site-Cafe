import IBebida from "../interfaces/IBebida";
import ApiService from "./ApiService";

class BebidaService extends ApiService<IBebida> {
    constructor() {
        super("bebidas")
    }
}
export default new BebidaService();