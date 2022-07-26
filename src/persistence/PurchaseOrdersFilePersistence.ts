import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { PurchaseOrdersMemoryPersistence } from './PurchaseOrdersMemoryPersistence';
import { PurchaseOrderV1 } from '../data/version1/PurchaseOrderV1';

export class PurchaseOrdersFilePersistence extends PurchaseOrdersMemoryPersistence {
	protected _persister: JsonFilePersister<PurchaseOrderV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<PurchaseOrderV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}