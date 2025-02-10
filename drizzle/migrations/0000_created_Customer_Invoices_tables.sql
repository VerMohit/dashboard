CREATE TABLE "customers" (
	"customer_id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	"email" varchar(255) NOT NULL,
	"company_name" varchar(355) NOT NULL,
	"unit_no" integer NOT NULL,
	"street" text NOT NULL,
	"city" text NOT NULL,
	"postal_code" text NOT NULL,
	"state" text NOT NULL,
	"country" text NOT NULL,
	"active" boolean DEFAULT true,
	CONSTRAINT "customers_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "customers_email_unique" UNIQUE("email"),
	CONSTRAINT "customers_company_name_unique" UNIQUE("company_name"),
	CONSTRAINT "check_active_boolean" CHECK ("active" IN (true, false))
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"invoice_id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer,
	"invoice_Number" text NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"amount_paid" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"invoice_date" date DEFAULT now() NOT NULL,
	"invoice_status" text DEFAULT 'Unpaid',
	CONSTRAINT "invoices_invoice_Number_unique" UNIQUE("invoice_Number"),
	CONSTRAINT "check_invoice_status" CHECK ("invoice_status" IN ('Paid', 'Unpaid'))
);
--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_id_customers_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customer_id") ON DELETE no action ON UPDATE no action;