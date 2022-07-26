import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { PurchaseOrderV1Schema } from '../data/version1/PurchaseOrderV1Schema';
import { IPurchaseOrdersController } from './IPurchaseOrdersController';

export class PurchaseOrdersCommandSet extends CommandSet {
    private _logic: IPurchaseOrdersController;

    constructor(logic: IPurchaseOrdersController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetPurchaseOrdersCommand());
		this.addCommand(this.makeGetPurchaseOrderByIdCommand());
		this.addCommand(this.makeCreatePurchaseOrderCommand());
		this.addCommand(this.makeUpdatePurchaseOrderCommand());
		this.addCommand(this.makeDeletePurchaseOrderByIdCommand());
    }

	private makeGetPurchaseOrdersCommand(): ICommand {
		return new Command(
			"get_orders",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                return await this._logic.getOrders(correlationId, filter, paging);
            }
		);
	}

	private makeGetPurchaseOrderByIdCommand(): ICommand {
		return new Command(
			"get_order_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('order_id', TypeCode.String)
				.withRequiredProperty('customer_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let orderId = args.getAsString("order_id");
                let customerId = args.getAsString("customer_id");
				return await this._logic.getOrderById(correlationId, orderId, customerId);
            }
		);
	}

	private makeCreatePurchaseOrderCommand(): ICommand {
		return new Command(
			"create_order",
			new ObjectSchema(true)
				.withRequiredProperty('order', new PurchaseOrderV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let order = args.get("order");
				return await this._logic.createOrder(correlationId, order);
            }
		);
	}

	private makeUpdatePurchaseOrderCommand(): ICommand {
		return new Command(
			"update_order",
			new ObjectSchema(true)
				.withRequiredProperty('order', new PurchaseOrderV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let order = args.get("order");
				return await this._logic.updateOrder(correlationId, order);
            }
		);
	}
	
	private makeDeletePurchaseOrderByIdCommand(): ICommand {
		return new Command(
			"delete_order_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('order_id', TypeCode.String)
				.withRequiredProperty('customer_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let orderId = args.getAsNullableString("order_id");
                let customerId = args.getAsString("customer_id");
				return await this._logic.deleteOrderById(correlationId, orderId, customerId);
			}
		);
	}

}