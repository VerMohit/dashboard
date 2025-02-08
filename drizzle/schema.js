"use strict";
// Schema for project using Drizzle ORM
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoices = exports.Customer = void 0;
/*
    To run migrations:
    `yarn generate --name=test_migration` OR
    `yarn drizzle-kit generate --config ./drizzle/drizzle.config.ts --name <name_of_schema_updates>`

    To push changes to actual db:
        `yarn drizzle-kit push` OR
        `yarn drizzle-kit push --config ./drizzle/drizzle.config.ts`

        Now conenct to DBeaver and should see the tables on Postgres

    Any changes we make to the schema will be done in this file. When we micgrate, Drizzle will compare agsint
    current db schema and apply changes made. We then need to push the migrations to see the updates on DBeaver
*/
var pg_core_1 = require("drizzle-orm/pg-core");
var invoiceEnum_1 = require("./lib/invoiceEnum");
// Customer table
exports.Customer = (0, pg_core_1.pgTable)("customers", {
    customerId: (0, pg_core_1.serial)("customer_id")
        .primaryKey(), // Autoincrementing ID
    firstName: (0, pg_core_1.text)("first_name")
        .notNull(),
    lastName: (0, pg_core_1.text)("last_name")
        .notNull(),
    phoneNo: (0, pg_core_1.varchar)("phone_number", { length: 15 })
        .unique()
        .notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 })
        .unique()
        .notNull(),
    companyName: (0, pg_core_1.varchar)("company_name", { length: 355 })
        .unique()
        .notNull(),
    unitNo: (0, pg_core_1.integer)("unit_no")
        .notNull(),
    street: (0, pg_core_1.text)("street")
        .notNull(),
    city: (0, pg_core_1.text)("city")
        .notNull(),
    postalCode: (0, pg_core_1.text)("postal_code")
        .notNull(),
    state: (0, pg_core_1.text)("state")
        .notNull(),
    country: (0, pg_core_1.text)("country")
        .notNull(),
});
// Invoices table
exports.Invoices = (0, pg_core_1.pgTable)("invoices", {
    invoiceId: (0, pg_core_1.serial)("invoice_id")
        .primaryKey(), // Autoincrementing ID
    customerId: (0, pg_core_1.integer)("customer_id")
        .references(function () { return exports.Customer.customerId; }), // Foreign key to Customer
    amount: (0, pg_core_1.decimal)("amount", { precision: 10, scale: 2 })
        .notNull(), // 10 digits for integer part and 2 digits for fractional part
    amountPaid: (0, pg_core_1.decimal)("amount_paid", { precision: 10, scale: 2 })
        .default("0.00")
        .notNull(), // Default value of $0.00
    invoiceDate: (0, pg_core_1.date)("invoice_date")
        .defaultNow()
        .notNull(), // Default to current date and time
    status: (0, pg_core_1.integer)("status")
        .default(invoiceEnum_1.InvoiceStatus.Unpaid)
        .notNull(), // Default to "Unpaid" status
});
