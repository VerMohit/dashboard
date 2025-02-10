-- Rename column "status" to "invoice_status" in the "invoices" table
ALTER TABLE "invoices" RENAME COLUMN "status" TO "invoice_status";--> statement-breakpoint

-- Add a CHECK constraint to ensure "invoice_status" only has "Paid" or "Unpaid" values
ALTER TABLE "invoices"
ADD CONSTRAINT "invoice_status_check" CHECK (invoice_status IN ('Paid', 'Unpaid'));

-- -- Add the "active" column with a default value of TRUE
-- ALTER TABLE "customers" ADD COLUMN "active" boolean DEFAULT true;--> statement-breakpoint

-- -- Add a CHECK constraint to ensure "active" column only has TRUE or FALSE values
-- ALTER TABLE "customers"
-- ADD CONSTRAINT "active_check" CHECK (active IN (TRUE, FALSE));

-- Add the "active" column with a default value of TRUE and a CHECK constraint to ensure "active" column only has TRUE or FALSE values
ALTER TABLE "customers"
ADD COLUMN "active" BOOLEAN DEFAULT TRUE,
ADD CONSTRAINT "active_check" CHECK (active IN (TRUE, FALSE));--> statement-breakpoint

-- Add the "invoice_Number" column as text and set it to NOT NULL
ALTER TABLE "invoices" 
ADD COLUMN "invoice_Number" text NOT NULL;--> statement-breakpoint

-- Ensure "invoice_Number" is unique
ALTER TABLE "invoices" 
ADD CONSTRAINT "invoices_invoice_Number_unique" UNIQUE("invoice_Number");