import ISetor from "../interfaces/ISetores";
import ApiService from "./ApiService";

class SetorService extends ApiService<ISetor> {
    constructor() {
        super("setores")
    }
}

export default new SetorService();