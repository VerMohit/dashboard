// Schema for project using Drizzle ORM

/*
    To run migrations: 
    `yarn generate --name=test_migration` OR
    `yarn drizzle-kit generate --config ./drizzle/drizzle.config.ts --name <name_of_schema_updates>`

    To drop migration:
        `yarn drizzle-kit drop` OR 
        `yarn drizzle-kit drop --config ./drizzle/drizzle.config.ts`

        NOTE: dropping a migration only drops that file and DOSEN'T revert the db change.
              So make sure that the migration is what we want before pushing, else it may be difficult
              to revert the db back to the last state

    To push changes to actual db: 
        `yarn drizzle-kit push` OR 
        `yarn drizzle-kit push --config ./drizzle/drizzle.config.ts`

        Now conenct to DBeaver and should see the tables on Postgres

    Any changes we make to the schema will be done in this file. When we micgrate, Drizzle will compare agsint
    current db schema and apply changes made. We then need to push the migrations to see the updates on DBeaver
*/

import { 
    pgTable, 
    serial,
    integer,
    decimal,
    text,
    date,
    varchar,
    boolean
} from "drizzle-orm/pg-core";

import { InvoiceStatus } from "./lib/invoiceEnum";


// Customer table
export const Customer = pgTable("customers", {
  customerId: serial("customer_id")
    .primaryKey(),                     // Autoincrementing ID
  firstName: text("first_name")
    .notNull(),
  lastName: text("last_name")
    .notNull(),
  phoneNo: varchar("phone_number", {length: 15})
    .unique()
    .notNull(),
  email: varchar("email", { length: 255 })
    .unique()
    .notNull(),       
  companyName: varchar("company_name", { length: 355 })
    .unique()
    .notNull(), 
  unitNo: integer("unit_no")
    .notNull(),
  street: text("street")
    .notNull(),
  city: text("city")
    .notNull(),
  postalCode: text("postal_code")
    .notNull(),
  state: text("state")
    .notNull(),
  country: text("country")
    .notNull(),
  active: boolean("active")  // Soft delete purposes
    .default(true),
});

// Invoices table
export const Invoices = pgTable("invoices", {
  invoiceId: serial("invoice_id")
    .primaryKey(),                                    // Autoincrementing ID
  customerId: integer("customer_id")
    .references(() => Customer.customerId),                 // Foreign key to Customer
  invoiceNumber: text("invoice_Number")
    .unique()
    .notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 })
    .notNull(),                                          // 10 digits for integer part and 2 digits for fractional part
  amountPaid: decimal("amount_paid", { precision: 10, scale: 2 })
    .default("0.00")
    .notNull(), // Default value of $0.00
  invoiceDate: date("invoice_date")
    .defaultNow()
    .notNull(),                                                                     // Default to current date and time
  invoiceStatus: text("invoice_status")
    .default(InvoiceStatus.Unpaid)
    // .notNull(),                                                                    // Default to "Unpaid" status
});
