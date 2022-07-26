import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { PurchaseOrderV1 } from '../data/version1/PurchaseOrderV1';

export interface IPurchaseOrdersController {
    getOrders(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PurchaseOrderV1>>;

    getOrderById(correlationId: string, order_id: string, customer_id: string): Promise<PurchaseOrderV1>;

    createOrder(correlationId: string, order: PurchaseOrderV1): Promise<PurchaseOrderV1>;

    updateOrder(correlationId: string, order: PurchaseOrderV1): Promise<PurchaseOrderV1>;

    deleteOrderById(correlationId: string, order_id: string, customer_id: string): Promise<PurchaseOrderV1>;
}
