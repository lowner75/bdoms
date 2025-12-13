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
    case 'PARTPAID':
      return {
        backgroundColor: '#ff7d40',
        borderColor: '#ff7d40',
        textColor: '#ffffff',
      };

    case 'SENT':
      return {
        backgroundColor: '#796dd7',
        borderColor: '#796dd7',
        textColor: '#ffffff',
      };

    case 'DRAFT':
      return {
        backgroundColor: '#ff41d3',
        borderColor: '#ff41d3',
        textColor: '#ffffff',
      };

    case 'CREDIT':
      return {
        backgroundColor: '#ff41d3',
        borderColor: '#ff41d3',
        textColor: '#ffffff',
      };

    default:
      return {
        backgroundColor: '#796dd7',
        borderColor: '#796dd7',
        textColor: '#ffffff',
      };
  }
}