"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.PurchaseOrdersLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const PurchaseOrdersServiceFactory_1 = require("../build/PurchaseOrdersServiceFactory");
class PurchaseOrdersLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("purchase_orders", "Purchase orders function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-purchaseorders', 'controller', 'default', '*', '*'));
        this._factories.add(new PurchaseOrdersServiceFactory_1.PurchaseOrdersServiceFactory());
    }
}
exports.PurchaseOrdersLambdaFunction = PurchaseOrdersLambdaFunction;
exports.handler = new PurchaseOrdersLambdaFunction().getHandler();
//# sourceMappingURL=PurchaseOrdersLambdaFunction.js.map