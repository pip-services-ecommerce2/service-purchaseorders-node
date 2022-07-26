"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrdersProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const PurchaseOrdersServiceFactory_1 = require("../build/PurchaseOrdersServiceFactory");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class PurchaseOrdersProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("purchase_orders", "Purchase orders microservice");
        this._factories.add(new PurchaseOrdersServiceFactory_1.PurchaseOrdersServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.PurchaseOrdersProcess = PurchaseOrdersProcess;
//# sourceMappingURL=PurchaseOrdersProcess.js.map