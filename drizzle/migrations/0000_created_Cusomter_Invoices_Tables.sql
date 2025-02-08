CREATE TABLE "customers" (
	"customer_id" serial PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"phone_number" varchar(15),
	"email" varchar(255),
	"company_name" varchar(255),
	"unit_no" integer,
	"street" text,
	"city" text,
	"postal_code" text,
	"state" text,
	"country" text,
	CONSTRAINT "customers_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "customers_email_unique" UNIQUE("email"),
	CONSTRAINT "customers_company_name_unique" UNIQUE("company_name")
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"invoice_id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer,
	"amount" numeric(10, 2),
	"amount_paid" numeric(10, 2) DEFAULT '0.00',
	"invoice_date" date DEFAULT now(),
	"status" integer DEFAULT 2
);
--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_id_customers_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customer_id") ON DELETE no action ON UPDATE no action;