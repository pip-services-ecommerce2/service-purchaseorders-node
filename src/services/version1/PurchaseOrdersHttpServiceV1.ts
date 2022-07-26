import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class PurchaseOrdersHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/purchase_orders');
        this._dependencyResolver.put('controller', new Descriptor('service-purchaseorders', 'controller', 'default', '*', '1.0'));
    }
}