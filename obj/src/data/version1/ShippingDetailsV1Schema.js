"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingDetailsV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class ShippingDetailsV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('recipient', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('phone', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('line1', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('line2', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('city', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('state', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('postal_code', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('country_code', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('instructions', pip_services3_commons_nodex_2.TypeCode.String);
    }
}
exports.ShippingDetailsV1Schema = ShippingDetailsV1Schema;
//# sourceMappingURL=ShippingDetailsV1Schema.js.map