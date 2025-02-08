"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceStatus = void 0;
// Enum for InvoiceStatus
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus[InvoiceStatus["Paid"] = 1] = "Paid";
    InvoiceStatus[InvoiceStatus["Unpaid"] = 2] = "Unpaid";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
