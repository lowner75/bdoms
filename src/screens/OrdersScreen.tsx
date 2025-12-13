// src/screens/OrdersScreen.tsx

import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { ThemedText } from '../components/ThemedText';
import { useAppTheme } from '../hooks/useAppTheme';
import { fetchActiveOrders, IOrderSummary } from '../services/orders.service';
import { ThemedView } from '../components/ThemedView';
import { SHIPPING_METHOD_LABELS } from '../constants/shippingMethods';
import { INVOICE_PAYMENT_STATUS_LABELS } from '../constants/invoicePaymentStatus';
import { getInvoiceStatusStyles } from '../utils/invoiceStatusStyles';
import { ThemedButton } from '../components/ThemedButton';
import { Ionicons } from '@expo/vector-icons';

export default function OrdersScreen() {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const [orders, setOrders] = useState<IOrderSummary[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadOrders() {
    setLoading(true);
    const data = await fetchActiveOrders();
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    async function loadOrders() {
      const data = await fetchActiveOrders();
      setOrders(data);

      // Dynamically update header
      navigation.setOptions({
        title: `Orders`
      });
    }

    loadOrders();
  }, []);

  // Dynamic theme-aware styles
  const themeStyles = {
    itemContainer: {
      //backgroundColor: colors.buttonColor,
      borderColor: colors.border,
    },
    itemTitle: {
      color: colors.text,
    },
  };
  
  function renderItem({ item }: { item: IOrderSummary }) {
    const shippingLabel = SHIPPING_METHOD_LABELS[item.shippingMethod] ?? 'Unknown';
    const invoiceStatusLabel = INVOICE_PAYMENT_STATUS_LABELS[item.invoiceStatus] ?? 'Unknown';
    const invoiceStyles = getInvoiceStatusStyles(item.invoiceStatus, colors);

    return (
      <ThemedView style={[styles.itemContainer, themeStyles.itemContainer ]}>
        <ThemedView style={[ styles.row, {  } ]}>

          <ThemedText type="defaultSemiBold" style={{ fontSize: 16 }}>
            Order ID:{' '}
            <ThemedText
              type="defaultSemiBold"
              style={{ color: colors.text }}
            >
              #{item.orderId}
            </ThemedText>
          </ThemedText>

          {/* Pre-order flag + invoice badge */}
          <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item.containsPreOrder ? (
              <Ionicons
                name="time-outline"
                size={16}
                color={colors.text}
                style={{ marginRight: 8 }}
              />
            ) : null}

            <ThemedView
              style={[
                styles.invoiceBadge,
                {
                  backgroundColor: invoiceStyles.backgroundColor,
                  borderColor: invoiceStyles.borderColor,
                },
              ]}
            >
              <ThemedText style={{ fontSize: 12, color: invoiceStyles.textColor }}>
                {invoiceStatusLabel}
              </ThemedText>
            </ThemedView>
          </ThemedView>

        </ThemedView>
        <ThemedText type="defaultSemiBold" style={{ fontSize: 13, marginTop: 6, opacity: 0.5 }}>Customer:</ThemedText>
        <ThemedText>{item.customerName}</ThemedText>
        {/*<ThemedText>Order Date: {new Date(item.orderDate).toLocaleDateString()}</ThemedText>*/}
        <ThemedText type="defaultSemiBold" style={{ fontSize: 13, marginTop: 6, marginBottom: 2, opacity: 0.5 }}>Item Lines:</ThemedText>
        <View style={[styles.row, { marginTop: 0 }]}>
          <ThemedText style={styles.itemLines}>Goods Value:</ThemedText>
          <ThemedText style={[styles.itemLines, { fontWeight: 'bold' }]}>£{item.goods.toFixed(2)}</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText style={styles.itemLines}>Carriage: ({shippingLabel})</ThemedText>
          <ThemedText style={[styles.itemLines, { fontWeight: 'bold' }]}>£{item.carriage.toFixed(2)}</ThemedText>
        </View>
        <View style={[styles.row, { marginBottom: 6 }]}>
          <ThemedText style={styles.itemLines}>Total (Ex VAT):</ThemedText>
          <ThemedText style={[styles.itemLines, { fontWeight: 'bold' }]}>£{(item.goods + item.carriage).toFixed(2)}</ThemedText>
        </View>
        {/*<ThemedText>Dispatch Date: {item.dispatchDate ? new Date(item.dispatchDate).toLocaleDateString() : 'N/A'}</ThemedText>*/}
        <ThemedButton title='View / Edit Order' textStyle={{ fontSize: 16 }} style={{ marginTop: 10, backgroundColor: colors.buttonColor }}></ThemedButton>
      </ThemedView>
    );
  }

  return (
    <ScreenWrapper>
      <ThemedText type="defaultSemiBold" style={{ marginTop: 20, marginBottom: 10 }}>Active Orders ({orders.length} Found)</ThemedText>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadOrders} />
        }
        contentContainerStyle={styles.listContent}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 10,
  },
  itemContainer: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0,
    padding: 12,
    marginBottom: 6,
    paddingHorizontal: 0,
  },
  itemLines: {
    fontSize: 13,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoiceBadge: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
});