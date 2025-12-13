// src/screens/OrdersScreen.tsx

import React, { useState, useEffect } from 'react';
import { FlatList, Image, Pressable, RefreshControl, StyleSheet, View } from 'react-native';
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
  const { colors, theme } = useAppTheme();
  const navigation = useNavigation();
  const [orders, setOrders] = useState<IOrderSummary[]>([]);
  const [loading, setLoading] = useState(false);

  const logoDark = require('../../assets/adaptive-icon-cropped.png');
  const logoLight = require('../../assets/adaptive-icon-cropped-light.png');

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
      title: `Orders`,
      headerRight: () => (
        <Pressable
          onPress={() => {
            // Open your custom search modal here
            console.log('Search button pressed');
          }}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="search-outline" size={20} color={colors.text} />
        </Pressable>
      ),
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
        <ThemedView style={[ styles.row, { marginBottom: 6 } ]}>

          <ThemedText style={{ fontSize: 16 }}>
            Order ID:{' '}
            <ThemedText
              type="defaultSemiBold"
              style={{ color: colors.text }}
            >
              #{item.orderId}
            </ThemedText>
          </ThemedText>

          {/* invoice link + invoice badge */}
          <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item.invoiceStatus ? (
              <Ionicons
                name="link"
                size={18}
                color={colors.icon}
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
        <ThemedText type="label" style={{ marginTop: 8, opacity: 0.5 }}>Customer:</ThemedText>
        <ThemedText style={{ marginTop: 5 }}>{item.customerName}</ThemedText>
        {item.orderReference && <ThemedText>Order Ref: {item.orderReference}</ThemedText>}
        {/*<ThemedText>Order Date: {new Date(item.orderDate).toLocaleDateString()}</ThemedText>*/}
        <ThemedText type="label" style={{ marginTop: 18, marginBottom: 2, opacity: 0.5 }}>Item Lines:</ThemedText>
        <View style={[styles.row, { marginTop: 6 }]}>
          <ThemedText style={styles.itemLines}>Goods Value:</ThemedText>
          <ThemedText style={[styles.itemLines, { fontWeight: 'normal' }]}>£{item.goods.toFixed(2)}</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText style={styles.itemLines}>Carriage: ({shippingLabel})</ThemedText>
          <ThemedText style={[styles.itemLines, { fontWeight: 'normal' }]}>£{item.carriage.toFixed(2)}</ThemedText>
        </View>
        <View style={[styles.row, { marginBottom: 16 }]}>
          <ThemedText style={[styles.itemLines, { fontWeight: 'bold' }]}>Total (Ex VAT):</ThemedText>
          <ThemedText style={[styles.itemLines, { fontWeight: 'bold' }]}>£{(item.goods + item.carriage).toFixed(2)}</ThemedText>
        </View>
        {/*<ThemedText>Dispatch Date: {item.dispatchDate ? new Date(item.dispatchDate).toLocaleDateString() : 'N/A'}</ThemedText>*/}
        {/*<ThemedButton title='View / Edit Order' textStyle={{ fontSize: 16 }} style={{ marginTop: 10, backgroundColor: colors.buttonColor }}></ThemedButton>*/}
        <ThemedButton
          title="Order Details"
          textStyle={{ fontSize: 16 }}
          style={{ marginTop: 10, backgroundColor: colors.buttonColor }}
          icon={<Ionicons name="document-text-outline" size={16} color={colors.text} />}
          type="accent"
        />

      </ThemedView>
    );
  }

  return (
    <ScreenWrapper>
      <ThemedView style={[styles.headerRow, { marginTop: 20 }]}>
        <ThemedView style={{ marginRight: 3, marginBottom: 22, borderRadius: 4, backgroundColor: colors.background, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="pulse-outline" size={22} color={colors.text} />
        </ThemedView>
        <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
          Active Orders ({orders.length} Found)
        </ThemedText>
      </ThemedView>
      {/*<ThemedText type="defaultSemiBold" style={{ marginTop: 20, marginBottom: 20 }}>Active ({orders.length} Found)</ThemedText>*/}
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
    paddingBottom: 10,
  },
  itemContainer: {
    borderTopWidth: 0.6,
    borderBottomWidth: 0,
    padding: 16,
    marginBottom: 6,
    paddingHorizontal: 10,
    //backgroundColor: "#222222"
  },
  itemLines: {
    fontSize: 12,
    lineHeight: 22,
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
  logo: {
    width: 25,
    height: 25,
    marginBottom: 22,
    marginRight: 6,
  },
  headerRow: {
    flexDirection: 'row', // side by side
    alignItems: 'center', // vertically center
  },
  headerTitle: {
    marginLeft: 8, // spacing between logo and title
    marginBottom: 22,
  },
});