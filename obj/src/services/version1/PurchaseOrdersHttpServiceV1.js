"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrdersHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class PurchaseOrdersHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/purchase_orders');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-purchaseorders', 'controller', 'default', '*', '1.0'));
    }
}
exports.PurchaseOrdersHttpServiceV1 = PurchaseOrdersHttpServiceV1;
//# sourceMappingURL=PurchaseOrdersHttpServiceV1.js.map