const Tenant = require("../models/tenantModel");

const addTenant = async (tenantData) => {
    return await Tenant.create(tenantData);
}