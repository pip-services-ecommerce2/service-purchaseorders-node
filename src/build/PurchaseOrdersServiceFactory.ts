import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { PurchaseOrdersMongoDbPersistence } from '../persistence/PurchaseOrdersMongoDbPersistence';
import { PurchaseOrdersFilePersistence } from '../persistence/PurchaseOrdersFilePersistence';
import { PurchaseOrdersMemoryPersistence } from '../persistence/PurchaseOrdersMemoryPersistence';
import { PurchaseOrdersController } from '../logic/PurchaseOrdersController';
import { PurchaseOrdersHttpServiceV1 } from '../services/version1/PurchaseOrdersHttpServiceV1';

export class PurchaseOrdersServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-purchaseorders", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-purchaseorders", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-purchaseorders", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-purchaseorders", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-purchaseorders", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-purchaseorders", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(PurchaseOrdersServiceFactory.MemoryPersistenceDescriptor, PurchaseOrdersMemoryPersistence);
		this.registerAsType(PurchaseOrdersServiceFactory.FilePersistenceDescriptor, PurchaseOrdersFilePersistence);
		this.registerAsType(PurchaseOrdersServiceFactory.MongoDbPersistenceDescriptor, PurchaseOrdersMongoDbPersistence);
		this.registerAsType(PurchaseOrdersServiceFactory.ControllerDescriptor, PurchaseOrdersController);
		this.registerAsType(PurchaseOrdersServiceFactory.HttpServiceDescriptor, PurchaseOrdersHttpServiceV1);
	}
	
}
