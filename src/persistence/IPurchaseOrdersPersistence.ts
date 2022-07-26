import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';

import { PurchaseOrderV1 } from '../data/version1/PurchaseOrderV1';

export interface IPurchaseOrdersPersistence extends IGetter<PurchaseOrderV1, string>, IWriter<PurchaseOrderV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PurchaseOrderV1>>;

    getOneById(correlationId: string, id: string): Promise<PurchaseOrderV1>;

    create(correlationId: string, item: PurchaseOrderV1): Promise<PurchaseOrderV1>;

    update(correlationId: string, item: PurchaseOrderV1): Promise<PurchaseOrderV1>;

    deleteById(correlationId: string, id: string): Promise<PurchaseOrderV1>;
}
