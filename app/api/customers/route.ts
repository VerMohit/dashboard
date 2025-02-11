import { db } from "@/drizzle/db";
import { NextResponse } from "next/server";
import { Customer, Invoices } from "@/drizzle/schema";
import { InsertedInvoice, InvoiceRequestData } from "@/app/types/invoiceTypes";
import { ValidationError, ConflictError, DatabaseError, AppError } from "../CustomError"; 
import { CustomerRequestData } from "@/app/types/customerTypes";
import { inArray } from "drizzle-orm";

// Retreive all customers
export async function GET() {
    try {
        const data = db.select()
                        .from(Customer);

        const customersData = await data;

        console.log("Successfully fetched all invoices");

        return NextResponse.json(
            customersData, 
            {status: 200}
        );

    } catch (error) {
        console.log("Couldn't fetch the invoices. Error: ", error);

        return NextResponse.json(
            { error: "Failed to return all customer data" },
            { status: 500 }
        )
    }
};

type RequestBody = {
    customer: CustomerRequestData;
    invoiceBatch?: InvoiceRequestData [];
}

// Add new customer to Customer Schema
export async function POST(req : Request) {
    try {
        const body = await req.json();

        const {customer, invoiceBatch} = body as RequestBody;

        console.log(customer);      // debugging purposes
        console.log(invoiceBatch);  // debugging purposes

        if(!Array.isArray(invoiceBatch)) {
            throw new ValidationError(`Invalid invoice formatting: ${invoiceBatch}`);
        }

        if(invoiceBatch.length > 0) {
            const invoiceNumbers = invoiceBatch.map(
                invoice => invoice.invoiceNumber
            );

            const existingInvoices = await db.select({ invoiceNumber: Invoices.invoiceNumber })
                                             .from(Invoices)
                                             .where(inArray(Invoices.invoiceNumber, invoiceNumbers))

            if(existingInvoices.length > 0) {
                const existingInvoiceNumbers = invoiceBatch.map(
                    invoice => invoice.invoiceNumber
                );
                throw new ConflictError(`Invoice number(s) already exist. Existing invoice number(s): ${existingInvoiceNumbers.join(', ') }`)
            }
        }
        
        const newCustomer = await db.insert(Customer)
                                    .values(customer)
                                    .onConflictDoNothing()         // DB level check to see if an entry with a unique attribute already exists; if so db throws error.
                                    .returning() as { customerId: number }[];

        if (!newCustomer.length) {
            throw new ConflictError(`Customer with this email already exists: ${customer.email}`);
        }

        const newCustomerId = newCustomer[0]?.customerId;

        if(newCustomerId === undefined || newCustomerId === null) {
            throw new DatabaseError(`Failed to create customer. Email: ${newCustomer[0].customerId}`);
        };

        console.log(newCustomer);  // debugging purposes
        
        let insertedInvoices : InsertedInvoice[] = [];

        // Insert invoice batch
        if(invoiceBatch.length > 0) {

            const invoiceData = invoiceBatch.map((invoice : InvoiceRequestData) => ({
                customerId: newCustomerId,
                invoiceNumber: invoice.invoiceNumber,
                amount: invoice.amount.toFixed(2),
                amountPaid: invoice.amountPaid.toFixed(2),
                invoiceDate: invoice.invoiceDate,
                invoiceStatus: invoice.invoiceStatus,

                
            }));

            insertedInvoices = await db.insert(Invoices)
                                    .values(invoiceData)
                                    .returning();
        }

        return NextResponse.json(
            {
                message: "Success: Customer (and invoices, if provided) added.",
                customer: newCustomer[0],
                invoices: insertedInvoices || [],
            },
            {status: 201}
        )
    } catch (error) {
        console.log("error: ", error);  // debugging purposes

        if (error instanceof AppError) {
            return NextResponse.json(
                error.toJSON(),
                {
                    status: error.statusCode
                }
            )
        }

        return NextResponse.json(
            {
                status: 'error',
                message: "Unexpected error occured",
                code: "INTERNAL_SERVER-ERROR"
            },
            {
                status: 500
            }
        );
    }
};