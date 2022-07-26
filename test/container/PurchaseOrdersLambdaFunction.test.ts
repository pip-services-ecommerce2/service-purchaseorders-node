const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { PurchaseOrderV1 } from '../../src/data/version1/PurchaseOrderV1';
import { PurchaseOrderStateV1 } from '../../src/data/version1/PurchaseOrderStateV1';
import { PurchaseOrdersLambdaFunction } from '../../src/container/PurchaseOrdersLambdaFunction';
import { TestModel } from '../data/TestModel';

let ORDER1: PurchaseOrderV1 = TestModel.createPurchaseOrder1();
let ORDER2: PurchaseOrderV1 = TestModel.createPurchaseOrder2();

suite('PurchaseOrdersLambdaFunction', () => {
    let lambda: PurchaseOrdersLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-purchaseorders:persistence:memory:default:1.0',
            'controller.descriptor', 'service-purchaseorders:controller:default:default:1.0'
        );

        lambda = new PurchaseOrdersLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });

    suiteTeardown(async () => {
        await lambda.close(null);
    });

    test('CRUD Operations', async () => {
        var purchaseOrder1, purchaseOrder2: PurchaseOrderV1;

        // Create one purchase order
        let purchaseOrder = await lambda.act(
            {
                role: 'purchase_orders',
                cmd: 'create_order',
                order: ORDER1
            }
        );

        assert.isObject(purchaseOrder);
        TestModel.assertEqualPurchaseOrder(purchaseOrder, ORDER1);

        purchaseOrder1 = purchaseOrder;

        // Create another purchase order
        purchaseOrder = await lambda.act(
            {
                role: 'purchase_orders',
                cmd: 'create_order',
                order: ORDER2
            }
        );

        assert.isObject(purchaseOrder);
        TestModel.assertEqualPurchaseOrder(purchaseOrder, ORDER2);

        purchaseOrder2 = purchaseOrder;

        // Get all purchase orders
        let page = await lambda.act(
            {
                role: 'purchase_orders',
                cmd: 'get_orders'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the purchase order
        purchaseOrder1.state = PurchaseOrderStateV1.Paid;

        purchaseOrder = await lambda.act(
            {
                role: 'purchase_orders',
                cmd: 'update_order',
                order: purchaseOrder1
            }
        );

        assert.isObject(purchaseOrder);
        assert.equal(purchaseOrder.state, PurchaseOrderStateV1.Paid);
        assert.equal(purchaseOrder.id, ORDER1.id);

        purchaseOrder1 = purchaseOrder;

        // Delete purchase order
        await lambda.act(
            {
                role: 'purchase_orders',
                cmd: 'delete_order_by_id',
                order_id: purchaseOrder1.id,
                customer_id: purchaseOrder1.customer_id
            }
        );

        // Try to get delete purchase order

        purchaseOrder = await lambda.act(
            {
                role: 'purchase_orders',
                cmd: 'get_order_by_id',
                order_id: purchaseOrder1.id,
                customer_id: purchaseOrder1.customer_id
            }
        );

        assert.isNull(purchaseOrder || null);
    });
});