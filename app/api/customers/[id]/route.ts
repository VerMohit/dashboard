import { db } from "@/drizzle/db";
import { Customer, Invoices } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { AppError, NotFoundError, ValidationError } from "../../CustomError";
import { NextResponse } from "next/server";

// think about how we can return information about the client if we click on their card
export async function GET (req: Request, context: { params: Promise<{ id: string }> }) {
    try {

        const params = await context.params;

        // Ensure that id being passed in is a number, of base 10
        const customerId = parseInt(params.id, 10);

        if(isNaN(customerId)) {
            throw new ValidationError(`Customer with id: ${customerId} not found.`)
        }

        const cusomterAndInvoicesData = await db.select()
                                 .from(Customer)
                                 .leftJoin(Invoices, eq(Customer.customerId, Invoices.customerId))
                                 .where(eq(Customer.customerId, customerId));
        
        if(cusomterAndInvoicesData.length === 0) {
            throw new NotFoundError(`Customer with id: ${cusomterAndInvoicesData[0].customers.customerId} not found`)
        }

        // Destructure the customer info
        const { customers } = cusomterAndInvoicesData[0];


        // Destructure to get associated invoice data. If invoice data is null, return empty array
        const customerInvoices = cusomterAndInvoicesData
                                    .map(invoiceData => invoiceData.invoices)
                                    .filter(invoiceData => invoiceData !== null);
        
          
        return NextResponse.json(
            {
                // message: "Success: Customer (and invoices, if provided) added.",
                customer: customers,
                invoices: customerInvoices,
            },
            {status: 200}
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
}







