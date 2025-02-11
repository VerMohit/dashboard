/*
    Keep in mind that the request body must have the same fields as defined in `InvoiceRequestData`,
    otherwise those fields will be assigned `undefined`

    JSON request body:
    {
        "customer":
        {
            "firstName": "Sally",
            "lastName": "Wu",
            "phoneNo": "+1 111 1112",
            "email": "sally.wu@example.com",
            "companyName": "SWu Enterprises",
            "unitNo": 101,
            "street": "123 Main St",
            "city": "New York",
            "postalCode": "10001",
            "state": "NY",
            "country": "USA",
            "active": true
        },
        "invoiceBatch": [
            {
            "invoiceNumber": "INV-005",
            "amount": 150.00,
            "amountPaid": 0.00,
            "invoiceDate": "2025-02-10",
            "invoiceStatus": "Unpaid"
            },
            {
            "invoiceNumber": "INV-006",
            "amount": 150.00,
            "amountPaid": 0.00,
            "invoiceDate": "2025-02-10",
            "invoiceStatus": "Unpaid"
            }
        ]
    }
*/

// For form request data coming from fronend when submitting invoice related data
type InvoiceRequestData = {
    invoiceNumber: string,
    amount: string,
    amountPaid: string,
    invoiceDate: string,
    invoiceStatus: "Paid" | "Unpaid",
}




// For inserted invoice data (returned from DB after insertion)
type InsertedInvoice = {
    invoiceId: number,
    customerId: number,
    invoiceNumber: string,
    amount: string,
    amountPaid: string,
    invoiceDate: string,
    invoiceStatus: string, 
}


// need to specify `type` because of tsconfig.json settings having `isolatedModules` enabled
export type {InvoiceRequestData, InsertedInvoice};