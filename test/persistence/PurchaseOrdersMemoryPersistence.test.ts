import { ConfigParams } from 'pip-services3-commons-nodex';

import { PurchaseOrdersMemoryPersistence } from '../../src/persistence/PurchaseOrdersMemoryPersistence';
import { PurchaseOrdersPersistenceFixture } from './PurchaseOrdersPersistenceFixture';

suite('PurchaseOrdersMemoryPersistence', ()=> {
    let persistence: PurchaseOrdersMemoryPersistence;
    let fixture: PurchaseOrdersPersistenceFixture;
    
    setup(async () => {
        persistence = new PurchaseOrdersMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new PurchaseOrdersPersistenceFixture(persistence);
        
        await persistence.open(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

});