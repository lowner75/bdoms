// src/constants/invoicePaymentStatus.ts

export const INVOICE_PAYMENT_STATUS_LABELS: Record<string, string> = {
  "DRAFT":      "Invoice Draft",
  "SENT":       "Invoice Sent",
  "PAIDPART":   "Partial Payment",
  "PAIDFULL":   "Invoice Paid",
  "UNPAID":     "Invoice Unpaid",
  "CREDIT":     "Credit Note",
  "DISPUTED":   "Invoice Disputed",
  "DELETED":    "Invoice Deleted",
  "ACTIVE":     "Invoice Active",
  "AGED":       "Invoice Aged",
};