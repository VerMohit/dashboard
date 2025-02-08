// For form request data coming from fronend when submitting invoice related data
type InvoiceRequestData = {
    invoiceAmount: number,
    invoiceAmountPaid: number,
    date: string,
    invoiceStatus: number,
}

// For inserted invoice data (returned from DB after insertion)
type InsertedInvoice = {
    invoiceId: number,
    customerId: number,
    amount: number,
    amountPaid: number,
    invoiceDate: string,
    status: number, 
}



// need to specify `type` because of tsconfig.json settings having `isolatedModules` enabled
export type {InvoiceRequestData, InsertedInvoice};