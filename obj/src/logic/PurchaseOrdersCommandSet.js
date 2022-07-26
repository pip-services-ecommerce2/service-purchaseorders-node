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
exports.PurchaseOrdersCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const PurchaseOrderV1Schema_1 = require("../data/version1/PurchaseOrderV1Schema");
class PurchaseOrdersCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetPurchaseOrdersCommand());
        this.addCommand(this.makeGetPurchaseOrderByIdCommand());
        this.addCommand(this.makeCreatePurchaseOrderCommand());
        this.addCommand(this.makeUpdatePurchaseOrderCommand());
        this.addCommand(this.makeDeletePurchaseOrderByIdCommand());
    }
    makeGetPurchaseOrdersCommand() {
        return new pip_services3_commons_nodex_2.Command("get_orders", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getOrders(correlationId, filter, paging);
        }));
    }
    makeGetPurchaseOrderByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_order_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('order_id', pip_services3_commons_nodex_6.TypeCode.String)
            .withRequiredProperty('customer_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let orderId = args.getAsString("order_id");
            let customerId = args.getAsString("customer_id");
            return yield this._logic.getOrderById(correlationId, orderId, customerId);
        }));
    }
    makeCreatePurchaseOrderCommand() {
        return new pip_services3_commons_nodex_2.Command("create_order", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('order', new PurchaseOrderV1Schema_1.PurchaseOrderV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let order = args.get("order");
            return yield this._logic.createOrder(correlationId, order);
        }));
    }
    makeUpdatePurchaseOrderCommand() {
        return new pip_services3_commons_nodex_2.Command("update_order", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('order', new PurchaseOrderV1Schema_1.PurchaseOrderV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let order = args.get("order");
            return yield this._logic.updateOrder(correlationId, order);
        }));
    }
    makeDeletePurchaseOrderByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_order_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('order_id', pip_services3_commons_nodex_6.TypeCode.String)
            .withRequiredProperty('customer_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let orderId = args.getAsNullableString("order_id");
            let customerId = args.getAsString("customer_id");
            return yield this._logic.deleteOrderById(correlationId, orderId, customerId);
        }));
    }
}
exports.PurchaseOrdersCommandSet = PurchaseOrdersCommandSet;
//# sourceMappingURL=PurchaseOrdersCommandSet.js.map