import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { PurchaseOrderV1 } from '../data/version1/PurchaseOrderV1';
import { IPurchaseOrdersPersistence } from './IPurchaseOrdersPersistence';
export declare class PurchaseOrdersMongoDbPersistence extends IdentifiableMongoDbPersistence<PurchaseOrderV1, string> implements IPurchaseOrdersPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PurchaseOrderV1>>;
}
