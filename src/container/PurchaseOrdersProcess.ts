import { ProcessContainer } from 'pip-services3-container-nodex';

import { PurchaseOrdersServiceFactory } from '../build/PurchaseOrdersServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

export class PurchaseOrdersProcess extends ProcessContainer {

    public constructor() {
        super("purchase_orders", "Purchase orders microservice");
        this._factories.add(new PurchaseOrdersServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
