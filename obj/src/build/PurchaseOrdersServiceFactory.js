"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrdersServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const PurchaseOrdersMongoDbPersistence_1 = require("../persistence/PurchaseOrdersMongoDbPersistence");
const PurchaseOrdersFilePersistence_1 = require("../persistence/PurchaseOrdersFilePersistence");
const PurchaseOrdersMemoryPersistence_1 = require("../persistence/PurchaseOrdersMemoryPersistence");
const PurchaseOrdersController_1 = require("../logic/PurchaseOrdersController");
const PurchaseOrdersHttpServiceV1_1 = require("../services/version1/PurchaseOrdersHttpServiceV1");
class PurchaseOrdersServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(PurchaseOrdersServiceFactory.MemoryPersistenceDescriptor, PurchaseOrdersMemoryPersistence_1.PurchaseOrdersMemoryPersistence);
        this.registerAsType(PurchaseOrdersServiceFactory.FilePersistenceDescriptor, PurchaseOrdersFilePersistence_1.PurchaseOrdersFilePersistence);
        this.registerAsType(PurchaseOrdersServiceFactory.MongoDbPersistenceDescriptor, PurchaseOrdersMongoDbPersistence_1.PurchaseOrdersMongoDbPersistence);
        this.registerAsType(PurchaseOrdersServiceFactory.ControllerDescriptor, PurchaseOrdersController_1.PurchaseOrdersController);
        this.registerAsType(PurchaseOrdersServiceFactory.HttpServiceDescriptor, PurchaseOrdersHttpServiceV1_1.PurchaseOrdersHttpServiceV1);
    }
}
exports.PurchaseOrdersServiceFactory = PurchaseOrdersServiceFactory;
PurchaseOrdersServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-purchaseorders", "factory", "default", "default", "1.0");
PurchaseOrdersServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-purchaseorders", "persistence", "memory", "*", "1.0");
PurchaseOrdersServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-purchaseorders", "persistence", "file", "*", "1.0");
PurchaseOrdersServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-purchaseorders", "persistence", "mongodb", "*", "1.0");
PurchaseOrdersServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-purchaseorders", "controller", "default", "*", "1.0");
PurchaseOrdersServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-purchaseorders", "service", "http", "*", "1.0");
//# sourceMappingURL=PurchaseOrdersServiceFactory.js.map