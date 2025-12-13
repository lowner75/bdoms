// src/utils/invoiceStatusStyles.ts

export type InvoiceStatusStyle = {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
};

export function getInvoiceStatusStyles(
  status: string,
  colors: {
    text: string;
    border: string;
  }
): InvoiceStatusStyle {
  switch (status) {
    case 'PAIDFULL':
    case 'PAIDPART':
      return {
        backgroundColor: '#769849',
        borderColor: 'transparent',
        textColor: '#ffffff',
      };

    case 'SENT':
      return {
        backgroundColor: '#4d57b1',
        borderColor: 'transparent',
        textColor: '#ffffff',
      };

    case 'DRAFT':
      return {
        backgroundColor: '#ff7d40',
        borderColor: '#ff7d40',
        textColor: '#ffffff',
      };

    case 'CREDIT':
      return {
        backgroundColor: '#ff41d3',
        borderColor: 'transparent',
        textColor: '#ffffff',
      };

    default:
      return {
        backgroundColor: '#cececeff',
        borderColor: 'transparent',
        textColor: '#000000',
      };
  }
}