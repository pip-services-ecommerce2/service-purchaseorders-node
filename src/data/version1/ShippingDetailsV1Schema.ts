import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class ShippingDetailsV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('recipient', TypeCode.String);
        this.withOptionalProperty('phone', TypeCode.String);
        this.withRequiredProperty('line1', TypeCode.String);
        this.withOptionalProperty('line2', TypeCode.String);
        this.withRequiredProperty('city', TypeCode.String);
        this.withOptionalProperty('state', TypeCode.String);
        this.withOptionalProperty('postal_code', TypeCode.String);
        this.withRequiredProperty('country_code', TypeCode.String);
        this.withOptionalProperty('instructions', TypeCode.String);
    }
}
