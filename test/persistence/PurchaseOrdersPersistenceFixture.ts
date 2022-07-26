const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { PurchaseOrderV1 } from '../../src/data/version1/PurchaseOrderV1';
import { PurchaseOrderStateV1 } from '../../src/data/version1/PurchaseOrderStateV1';

import { IPurchaseOrdersPersistence } from '../../src/persistence/IPurchaseOrdersPersistence';
import { TestModel } from '../data/TestModel';

let ORDER1: PurchaseOrderV1 = TestModel.createPurchaseOrder1();
let ORDER2: PurchaseOrderV1 = TestModel.createPurchaseOrder2();
let ORDER3: PurchaseOrderV1 = TestModel.createPurchaseOrder3();

export class PurchaseOrdersPersistenceFixture {
    private _persistence: IPurchaseOrdersPersistence;

    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private async testCreatePurchaseOrders() {
        // Create one purchase order
        let purchaseOrder = await this._persistence.create(null, ORDER1);

        assert.isObject(purchaseOrder);
        TestModel.assertEqualPurchaseOrder(purchaseOrder, ORDER1);

        // Create another purchase order
        purchaseOrder = await this._persistence.create(null, ORDER2);

        assert.isObject(purchaseOrder);
        TestModel.assertEqualPurchaseOrder(purchaseOrder, ORDER2);

        // Create yet another purchase order
        purchaseOrder = await this._persistence.create(null, ORDER3);

        assert.isObject(purchaseOrder);
        TestModel.assertEqualPurchaseOrder(purchaseOrder, ORDER3);
    }

    public async testCrudOperations() {
        let purchaseOrder1: PurchaseOrderV1;
        
        // Create items
        await this.testCreatePurchaseOrders();

        // Get all purchase orders
        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        purchaseOrder1 = page.data[0];

        // Update the purchase order
        purchaseOrder1.state = PurchaseOrderStateV1.Paid;

        let purchaseOrder = await this._persistence.update(null, purchaseOrder1);

        assert.isObject(purchaseOrder);
        assert.equal(purchaseOrder.state, PurchaseOrderStateV1.Paid);

        purchaseOrder1 = purchaseOrder;

        // Delete purchase order
        await this._persistence.deleteById(null, purchaseOrder1.id);

        // Try to get delete purchase order
        purchaseOrder = await this._persistence.getOneById(null, purchaseOrder1.id);
        
        assert.isNull(purchaseOrder || null);
    }

    public async testGetWithFilter() {
        // Create purchase orders
        await this.testCreatePurchaseOrders();

        // Get purchase orders filtered by customer id
        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                customer_id: '1'
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get purchase orders by state
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                state: PurchaseOrderStateV1.Paid
            }),
            new PagingParams()
        );
        
        assert.isObject(page);
        assert.lengthOf(page.data, 1);

        // Get purchase orders by ids
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                ids: ['1', '3']
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);


        // Get purchase orders by create time
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                created_from: new Date(2000, 1, 1),
                created_to: new Date(2020, 12, 31),
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get purchase orders filtered by product id
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                product_id: 'product-1'
            }),
            new PagingParams()
        );
        
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
    }
}
