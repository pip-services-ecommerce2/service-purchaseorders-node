"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrdersFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const PurchaseOrdersMemoryPersistence_1 = require("./PurchaseOrdersMemoryPersistence");
class PurchaseOrdersFilePersistence extends PurchaseOrdersMemoryPersistence_1.PurchaseOrdersMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.PurchaseOrdersFilePersistence = PurchaseOrdersFilePersistence;
//# sourceMappingURL=PurchaseOrdersFilePersistence.js.map