const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { PurchaseOrderV1 } from '../../../src/data/version1/PurchaseOrderV1';
import { PurchaseOrderStateV1 } from '../../../src/data/version1/PurchaseOrderStateV1';
import { PurchaseOrdersMemoryPersistence } from '../../../src/persistence/PurchaseOrdersMemoryPersistence';
import { PurchaseOrdersController } from '../../../src/logic/PurchaseOrdersController';
import { PurchaseOrdersHttpServiceV1 } from '../../../src/services/version1/PurchaseOrdersHttpServiceV1';
import { TestModel } from '../../data/TestModel';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let ORDER1: PurchaseOrderV1 = TestModel.createPurchaseOrder1();
let ORDER2: PurchaseOrderV1 = TestModel.createPurchaseOrder2();


suite('PurchaseOrdersHttpServiceV1', () => {
    let service: PurchaseOrdersHttpServiceV1;
    let rest: any;

    suiteSetup(async () => {
        let persistence = new PurchaseOrdersMemoryPersistence();
        let controller = new PurchaseOrdersController();

        service = new PurchaseOrdersHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-purchaseorders', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-purchaseorders', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-purchaseorders', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });

    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });


    test('CRUD Operations', async () => {
        let purchaseOrder1, purchaseOrder2: PurchaseOrderV1;

        // Create one purchase order
        let purchaseOrder = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/purchase_orders/create_order',
                {
                    order: ORDER1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(purchaseOrder);
        TestModel.assertEqualPurchaseOrder(purchaseOrder, ORDER1);

        purchaseOrder1 = purchaseOrder;

        // Create another purchase order
        purchaseOrder = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/purchase_orders/create_order',
                {
                    order: ORDER2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(purchaseOrder);
        TestModel.assertEqualPurchaseOrder(purchaseOrder, ORDER2);

        purchaseOrder2 = purchaseOrder;

        // Get all purchase orders
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/purchase_orders/get_orders',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get purchase orders by creation time
        page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/purchase_orders/get_orders',
                {
                    filter: {
                        created_from: new Date(2000, 1, 1),
                        created_to: new Date(2020, 12, 31),
                    }
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the purchase order
        purchaseOrder1.state = PurchaseOrderStateV1.Paid;

        purchaseOrder = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/purchase_orders/update_order',
                {
                    order: purchaseOrder1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(purchaseOrder);
        assert.equal(purchaseOrder.state, PurchaseOrderStateV1.Paid);
        assert.equal(purchaseOrder.id, ORDER1.id);

        purchaseOrder1 = purchaseOrder;

        // Delete purchase order
        let result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/purchase_orders/delete_order_by_id',
                {
                    order_id: purchaseOrder1.id,
                    customer_id: purchaseOrder1.customer_id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(result);

        // Try to get delete purchase order
        result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/purchase_orders/get_order_by_id',
                {
                    order_id: purchaseOrder1.id,
                    customer_id: purchaseOrder1.customer_id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(result);
    });
});