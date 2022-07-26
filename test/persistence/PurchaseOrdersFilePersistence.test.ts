import { PurchaseOrdersFilePersistence } from '../../src/persistence/PurchaseOrdersFilePersistence';
import { PurchaseOrdersPersistenceFixture } from './PurchaseOrdersPersistenceFixture';

suite('PurchaseOrdersFilePersistence', ()=> {
    let persistence: PurchaseOrdersFilePersistence;
    let fixture: PurchaseOrdersPersistenceFixture;
    
    setup(async () => {
        persistence = new PurchaseOrdersFilePersistence('./data/purchase_orders.test.json');

        fixture = new PurchaseOrdersPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
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