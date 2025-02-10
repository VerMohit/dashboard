/*
    To run the seed script, run `yarn ts-node drizzle/seed.ts`
    first add this into package.json file:
    ```
      "scripts": {
        "seed": "ts-node seed.ts"
      }
    ```
    The "seed" script in your package.json will only run when you manually invoke it. does not automatically run when you deploy your application unless you specifically configure it.

    Then run,

    ```
      yarn seed
    ```

    The way I currently sseded the data was converting this file into a .cjs file, change "type":"commonjs" 
    instead of "module" in package.json file, and running the command,

      `yarn ts-node seed.cjs`

*/

import { db } from './drizzle/db'; // Import your Drizzle db instance
import { InvoiceStatus } from './drizzle/lib/invoiceEnum'; // Import the InvoiceStatus enum
import { Customer, Invoices } from './drizzle/schema'; // Import the table definitions

async function seedDB() {
  console.log("🗑️ Seeding database...");
  try {
  // Create fake customers with all required fields
  const insertedCustomer = await db.insert(Customer).values([
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      companyName: 'Doe Enterprises',
      unitNo: 101,
      street: '123 Main St',
      city: 'New York',
      postalCode: '10001',
      state: 'NY',
      country: 'USA',
      phoneNo: '+1 123 456 7890',
      active: true, // Explicitly setting active status
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      companyName: 'Smith Solutions',
      unitNo: 202,
      street: '456 Elm St',
      city: 'San Francisco',
      postalCode: '94016',
      state: 'CA',
      country: 'USA',
      phoneNo: '+1 987 654 3210',
      active: true,
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      companyName: 'Alice Corp',
      unitNo: 303,
      street: '789 Oak St',
      city: 'Los Angeles',
      postalCode: '90001',
      state: 'CA',
      country: 'USA',
      phoneNo: '+1 555 123 4567',
      active: true,
    },
  ]).returning({ customerId: Customer.customerId });

  const customerIds = insertedCustomer.map((customer) => customer.customerId);

  // Create fake invoices with all required fields
  const invoices = await db.insert(Invoices).values([
    {
      invoiceNumber: 'INV-001',
      amount: 150.00,
      amountPaid: 0.00,
      invoiceStatus: InvoiceStatus.Unpaid,
      customerId: customerIds[0],
      invoiceDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    },
    {
      invoiceNumber: 'INV-002',
      amount: 200.00,
      amountPaid: 200.00,
      invoiceStatus: InvoiceStatus.Paid,
      customerId: customerIds[1],
      invoiceDate: new Date().toISOString().split('T')[0],
    },
    {
      invoiceNumber: 'INV-003',
      amount: 250.00,
      amountPaid: 0.00,
      invoiceStatus: InvoiceStatus.Unpaid,
      customerId: customerIds[1],
      invoiceDate: new Date().toISOString().split('T')[0],
    },
    {
      invoiceNumber: 'INV-004',
      amount: 300.00,
      amountPaid: 0.00,
      invoiceStatus: InvoiceStatus.Unpaid,
      customerId: customerIds[2],
      invoiceDate: new Date().toISOString().split('T')[0],
    },
  ]);
  console.log("✅ Seeded database successfully!");
  } catch (error) {
    console.error("❌ Error seeding the database:", error);
  }
}


seedDB().catch(err => console.error("❌ Error seeding:", err));