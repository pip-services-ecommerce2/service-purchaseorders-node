import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { BadRequestException } from 'pip-services3-commons-nodex';

import { PurchaseOrderV1 } from '../data/version1/PurchaseOrderV1';
import { PurchaseOrderStateV1 } from '../data/version1/PurchaseOrderStateV1';
import { IPurchaseOrdersPersistence } from '../persistence/IPurchaseOrdersPersistence';
import { IPurchaseOrdersController } from './IPurchaseOrdersController';
import { PurchaseOrdersCommandSet } from './PurchaseOrdersCommandSet';

export class PurchaseOrdersController implements  IConfigurable, IReferenceable, ICommandable, IPurchaseOrdersController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-purchaseorders:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(PurchaseOrdersController._defaultConfig);
    private _persistence: IPurchaseOrdersPersistence;
    private _commandSet: PurchaseOrdersCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IPurchaseOrdersPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new PurchaseOrdersCommandSet(this);
        return this._commandSet;
    }
    
    public async getOrders(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PurchaseOrderV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getOrderById(correlationId: string, id: string, customerId: string): Promise<PurchaseOrderV1> {
        let order = await this._persistence.getOneById(correlationId, id);

        // Do not allow to access order of different customer
        if (order && order.customer_id != customerId)
            order = null;

        return order;
    }

    public async createOrder(correlationId: string, order: PurchaseOrderV1): Promise<PurchaseOrderV1> {

        order.state = order.state || PurchaseOrderStateV1.New;
        order.create_time ??= new Date();
        order.update_time ??= new Date();

        return await this._persistence.create(correlationId, order);
    }

    public async updateOrder(correlationId: string, order: PurchaseOrderV1): Promise<PurchaseOrderV1> {
        let newOrder: PurchaseOrderV1;

        order.state = order.state || PurchaseOrderStateV1.New;
        order.update_time = new Date();
        
        let data = await this._persistence.getOneById(correlationId, order.id);

        if (data && data.customer_id != order.customer_id) {
            throw new BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong purchase order customer id')
                .withDetails('id', order.id)
                .withDetails('customer_id', order.customer_id);
        }

        newOrder = await this._persistence.update(correlationId, order);

        return newOrder;
    }

    public async deleteOrderById(correlationId: string, id: string, customerId: string): Promise<PurchaseOrderV1> {  

        let oldOrder: PurchaseOrderV1;

        let data = await this._persistence.getOneById(correlationId, id);

        if (data && data.customer_id != customerId) {
            throw new BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong purchase order customer id')
                .withDetails('id', id)
                .withDetails('customer_id', customerId);
        }

        oldOrder = await this._persistence.deleteById(correlationId, id);

        return oldOrder;
    }
}
