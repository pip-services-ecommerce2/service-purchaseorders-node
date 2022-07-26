import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { PurchaseOrderV1 } from '../data/version1/PurchaseOrderV1';
import { IPurchaseOrdersController } from './IPurchaseOrdersController';
export declare class PurchaseOrdersController implements IConfigurable, IReferenceable, ICommandable, IPurchaseOrdersController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getOrders(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PurchaseOrderV1>>;
    getOrderById(correlationId: string, id: string, customerId: string): Promise<PurchaseOrderV1>;
    createOrder(correlationId: string, order: PurchaseOrderV1): Promise<PurchaseOrderV1>;
    updateOrder(correlationId: string, order: PurchaseOrderV1): Promise<PurchaseOrderV1>;
    deleteOrderById(correlationId: string, id: string, customerId: string): Promise<PurchaseOrderV1>;
}
