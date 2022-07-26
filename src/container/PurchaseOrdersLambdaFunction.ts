import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { PurchaseOrdersServiceFactory } from '../build/PurchaseOrdersServiceFactory';

export class PurchaseOrdersLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("purchase_orders", "Purchase orders function");
        this._dependencyResolver.put('controller', new Descriptor('service-purchaseorders', 'controller', 'default', '*', '*'));
        this._factories.add(new PurchaseOrdersServiceFactory());
    }
}

export const handler = new PurchaseOrdersLambdaFunction().getHandler();