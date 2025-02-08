import { db } from "@/drizzle/db";
import { Invoices } from "@/drizzle/schema";
import { NextResponse } from "next/server";

// GET all invoices
export async function GET() {
    try {
        const data = db.select()
                       .from(Invoices);

        const invoicesData = await data;

        console.log("Successfully fetched all invoices");

        return NextResponse.json(
            invoicesData,
            {status: 200}
        );

    } catch (error) {
        console.log("Couldn't fetch the invoices. Error: ", error);

        return NextResponse.json(
            {error: "Failed to get invoices"},
            {status: 500}
        );
    }
}