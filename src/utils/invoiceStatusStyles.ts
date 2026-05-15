// src/utils/invoiceStatusStyles.ts

export type InvoiceStatusStyle = {
  badgeStyle: {
    backgroundColor: string;
    borderColor: string;
  },
  textStyle: {
    color: string;
  }
};

export function getInvoiceStatusStyles(
  status: string,
  // Optional parameter for theme colours 
  colors?: {
    textColor: string;
    borderColor: string;
  }
): InvoiceStatusStyle {
  switch (status) {
    case 'PAIDFULL':
    case 'PAIDPART':
      return {
        badgeStyle: {
          backgroundColor: '#769849',
          borderColor: 'transparent',
        },
        textStyle: {
          color: '#ffffff',
        },
      };

    case 'SENT':
      return {
        badgeStyle: {
          backgroundColor: '#616161',
          borderColor: 'transparent',
        },
        textStyle: {
          color: '#ffffff',
        },
      };

    case 'DRAFT':
      return {
        badgeStyle: {
          backgroundColor: '#ff7d40',
          borderColor: '#ff7d40',
        },
        textStyle: {
          color: '#ffffff',
        },
      };

    case 'CREDIT':
      return {
        badgeStyle: {
          backgroundColor: '#ff41d3',
          borderColor: 'transparent',
        },
        textStyle: {
          color: '#ffffff',
        },
      };

    default:
      return {
        badgeStyle: {
          backgroundColor: '#cececeff',
          borderColor: 'transparent',
        },
        textStyle: {
          color: '#000000',
        },
      };
  }
}