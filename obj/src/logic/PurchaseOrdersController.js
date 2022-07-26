"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrdersController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const PurchaseOrderStateV1_1 = require("../data/version1/PurchaseOrderStateV1");
const PurchaseOrdersCommandSet_1 = require("./PurchaseOrdersCommandSet");
class PurchaseOrdersController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(PurchaseOrdersController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new PurchaseOrdersCommandSet_1.PurchaseOrdersCommandSet(this);
        return this._commandSet;
    }
    getOrders(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getOrderById(correlationId, id, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            let order = yield this._persistence.getOneById(correlationId, id);
            // Do not allow to access order of different customer
            if (order && order.customer_id != customerId)
                order = null;
            return order;
        });
    }
    createOrder(correlationId, order) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            order.state = order.state || PurchaseOrderStateV1_1.PurchaseOrderStateV1.New;
            (_a = order.create_time) !== null && _a !== void 0 ? _a : (order.create_time = new Date());
            (_b = order.update_time) !== null && _b !== void 0 ? _b : (order.update_time = new Date());
            return yield this._persistence.create(correlationId, order);
        });
    }
    updateOrder(correlationId, order) {
        return __awaiter(this, void 0, void 0, function* () {
            let newOrder;
            order.state = order.state || PurchaseOrderStateV1_1.PurchaseOrderStateV1.New;
            order.update_time = new Date();
            let data = yield this._persistence.getOneById(correlationId, order.id);
            if (data && data.customer_id != order.customer_id) {
                throw new pip_services3_commons_nodex_3.BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong purchase order customer id')
                    .withDetails('id', order.id)
                    .withDetails('customer_id', order.customer_id);
            }
            newOrder = yield this._persistence.update(correlationId, order);
            return newOrder;
        });
    }
    deleteOrderById(correlationId, id, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldOrder;
            let data = yield this._persistence.getOneById(correlationId, id);
            if (data && data.customer_id != customerId) {
                throw new pip_services3_commons_nodex_3.BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong purchase order customer id')
                    .withDetails('id', id)
                    .withDetails('customer_id', customerId);
            }
            oldOrder = yield this._persistence.deleteById(correlationId, id);
            return oldOrder;
        });
    }
}
exports.PurchaseOrdersController = PurchaseOrdersController;
PurchaseOrdersController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-purchaseorders:persistence:*:*:1.0');
//# sourceMappingURL=PurchaseOrdersController.js.map