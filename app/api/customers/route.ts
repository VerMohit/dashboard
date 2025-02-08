import { db } from "@/drizzle/db";
import { NextResponse } from "next/server";
import { Customer, Invoices } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { InsertedInvoice, InvoiceRequestData } from "@/app/types/invoiceTypes";
import { ValidationError, ConflictError, NotFoundError, DatabaseError, AppError } from "../CustomError"; 
import { Code } from "@mantine/core";

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

// Add new customer to Customer Schema
export async function POST(req : Request) {
    try {
        const body = await req.json();

        const transactionResult = await db.transaction(async (trx) => {
            const existingCustomer = await trx.select()
                                              .from(Customer)
                                              .where(eq(Customer.email, body.email))
                                              .limit(1);

            if (existingCustomer.length > 0) {
                throw new ConflictError("Customer with this email already exists");
            }

            const newCustomer = await trx.insert(Customer)
                                        .values(body)
                                        .returning();

            const newCustomerId = newCustomer[0]?.customerId as number;

            if(newCustomerId === undefined || newCustomerId === null) {
                throw new DatabaseError("Failed to create customer");
            };

            console.log(newCustomer);
        
            let insertedInvoices : InsertedInvoice[] = [];
    
            // Insert invoice batch
            if(Array.isArray(body.invoices) && body.invoices.length > 0) {
                const invoiceData = body.invoices.map((invoice : InvoiceRequestData) => ({
                    customerId: newCustomerId,
                    amount: invoice.invoiceAmount,
                    amountPaid: invoice.invoiceAmountPaid,
                    invoiceDate: invoice.date,
                    status: invoice.invoiceStatus,
                }));
    
                insertedInvoices = await trx.insert(Invoices).values(invoiceData).returning();
            }

            return { newCustomer, insertedInvoices }

        });


        return NextResponse.json(
            {
                message: "Success: Customer (and invoices, if provided) added.",
                customer: transactionResult.newCustomer[0],
                invoices: transactionResult.insertedInvoices || [],
            },
            {status: 201}
        );








        // const existingCustomer = await db.select()
        //                                  .from(Customer)
        //                                  .where(eq(Customer.email, body.email))
        //                                  .limit(1);

        // if (existingCustomer.length > 0) {
        //     NextResponse.json(
        //         {error: "Customer with this email already exists"},
        //         {status: 409}
        //     );
        // }    
        
        // const newCustomer = await db.insert(Customer)
        //                             .values(body)
        //                             .returning() as { customerId: number }[];

        // const newCustomerId = newCustomer[0]?.customerId;


        // if(newCustomerId === undefined || newCustomerId === null) {
        //     return NextResponse.json(
        //         {error: "Failed to create customer"},
        //         {status: 500}
        //     )
        // };

        // console.log(newCustomer);
        
        // let insertedInvoices : InsertedInvoice[] = [];

        // // Insert invoice batch
        // if(Array.isArray(body.invoices) && body.invoices.length > 0) {
        //     const invoiceData = body.invoices.map((invoice : InvoiceRequestData) => ({
        //         customerId: newCustomerId,
        //         amount: invoice.invoiceAmount,
        //         amountPaid: invoice.invoiceAmountPaid,
        //         invoiceDate: invoice.date,
        //         status: invoice.invoiceStatus,
        //     }));

        //     insertedInvoices = await db.insert(Invoices).values(invoiceData).returning();
        // }

        // return NextResponse.json(
        //     {
        //         message: "Success: Customer (and invoices, if provided) added.",
        //         customer: newCustomer[0],
        //         invoices: insertedInvoices || [],
        //     },
        //     {status: 201}
        // )
    } catch (error) {
        console.log("error: ", error);

        if (error instanceof AppError) {
            return NextResponse.json(
                {
                    status: 'error',
                    message: error.message,
                    code: error.code
                },
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
        )



    }
};