import { db } from "@/drizzle/db";
import { Customer } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// think about how we can return information about the client if we click on their card
export async function GET (_req: Request, {params}:{params: {id:string}}) {
    try {

        // Ensure that id being passed in is a number, of base 10
        const customerId = parseInt(params.id, 10);

        if(isNaN(customerId)) {
            return NextResponse.json(
                {error: "Invalid customer ID"},
                {status: 400}
            );
        }

        const cusomter = await db.select()
                                 .from(Customer)
                                 .where(eq(Customer.customerId, customerId))
        
        if(cusomter.length === 0) {
            return NextResponse.json(
                {error: "No customer found"},
                {status: 404}
            );
        }

        return NextResponse.json(cusomter[0], {status: 200});
    } catch (error) {
        console.log("Couldn't find customer. Database error: ", error)
        return NextResponse.json(
            {error: "Coudln't find any cusomters"},
            {status: 500}
        );
    }
}

export async function POST(req: Request) {
    try {
        
    } catch (error) {
        
    }
}






