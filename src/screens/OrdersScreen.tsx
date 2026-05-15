// src/screens/OrdersScreen.tsx

import React, { useState, useEffect } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { ThemedText } from '../components/ThemedText';
import { useAppTheme } from '../hooks/useAppTheme';
import { fetchActiveOrders, IOrderSummary } from '../services/orders.service';
import { ThemedView } from '../components/ThemedView';
import { SHIPPING_METHOD_LABELS } from '../constants/shippingMethods';
import { INVOICE_PAYMENT_STATUS_LABELS } from '../constants/invoicePaymentStatus';
import { getInvoiceStatusStyles } from '../utils/invoiceStatusStyles';
import { Ionicons } from '@expo/vector-icons';
import { AlertModal } from '../components/AlertModal';

export default function OrdersScreen() {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const [orders, setOrders] = useState<IOrderSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState<{ title?: string; message: string } | null>(null);

  const [expandedOrders, setExpandedOrders] = useState<{ [id: string]: boolean }>({});

  function toggleOrder(id: number) {
    setExpandedOrders(prev => ({ ...prev, [id]: !prev[id] }));
  }

  async function loadOrders() {
    setLoading(true);
    try {
      const data = await fetchActiveOrders();
      setOrders(data);
    } catch (error: any) {
      setAlertData({ title: 'Error', message: error.message || 'An error occurred while fetching orders' });
    } finally {
      setLoading(false);
    }
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
          <Ionicons name="search-outline" size={20} color={colors.textColor} />
        </Pressable>
      ),
    });
  }

    loadOrders();
  }, []);

  // Dynamic theme-aware styles
  const themeStyles = {
    itemContainer: {
      borderColor: colors.borderColor,
    },
    itemTitle: {
      color: colors.textColor,
    },
  };
  
  function renderItem({ item }: { item: IOrderSummary }) {
    const shippingLabel = SHIPPING_METHOD_LABELS[item.shippingMethod] ?? 'Unknown';
    const invoiceStatusLabel = INVOICE_PAYMENT_STATUS_LABELS[item.invoiceStatus] ?? 'Unknown';
    const invoiceStyles = getInvoiceStatusStyles(item.invoiceStatus);

    return (
      <ThemedView style={[styles.itemContainer, { marginBottom: 10, backgroundColor: colors.cardBackgroundColor }]}>

        {/* Card body */}
        <View style={styles.cardContent}>


          <ThemedView>
            <View>
              <ThemedView style={[styles.itemContainer, themeStyles.itemContainer, { backgroundColor: colors.cardBackgroundColor }]}>
                <ThemedView style={[ styles.row, { marginBottom: 6 } ]}>

                  <ThemedView style={[styles.headerRow]}>
                    <ThemedView style={{ marginRight: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Ionicons name="cube-outline" size={22} color={colors.textColor} />
                    </ThemedView>
                    <ThemedText style={{ fontSize: 16 }}>
                      Order{' '}
                      <ThemedText
                        type="defaultSemiBold"
                        style={{ color: colors.textColor }}
                      >
                        #{item.orderId}
                      </ThemedText>
                    </ThemedText>
                  </ThemedView>

                  {/* invoice link + invoice badge */}
                  <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {item.invoiceStatus ? (
                      <Ionicons
                        name="link"
                        size={18}
                        color={colors.iconColor}
                        style={{ marginRight: 8 }}
                      />
                    ) : null}

                    <ThemedView
                      style={[
                        styles.invoiceBadge, invoiceStyles.badgeStyle,
                      ]}
                    >
                      <ThemedText style={[{ fontSize: 12 }, invoiceStyles.textStyle ]}>
                        {invoiceStatusLabel}
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>

                </ThemedView>

                {/* Customer Name */}
                <ThemedText type="label" style={{ marginTop: 10, opacity: 0.5 }}>Customer:</ThemedText>
                <ThemedText style={{ marginTop: 5 }}>{item.customerName}</ThemedText>
                {item.orderReference && <ThemedText>Order Ref: {item.orderReference}</ThemedText>}

                {/* Dates */}
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 16 }}>
                  {/* Left column: icons + dashed line */}
                  <View style={{ alignItems: 'center' }}>
                    {/* Order Received Icon */}
                    <View style={[styles.statusIcon, { marginTop: 8, backgroundColor: colors.iconColor }]} >
                      <Ionicons name="checkmark" size={12} color="#fff" />
                    </View>

                    {/* Dashed line with fixed height */}
                    <View
                      style={{
                        width: 2,
                        height: 23, // adjust to control dashed line spacing
                        borderLeftWidth: 1,
                        borderColor: colors.iconColor,
                        borderStyle: 'dashed',
                        marginVertical: 2,
                      }}
                    />

                    {/* Invoice Issued Icon */}
                    <View style={[
                      styles.statusIcon,
                      {
                        backgroundColor: item.invoiceStatus ? "#769849ff" : colors.iconColor,
                      }
                    ]}>
                      <Ionicons name={item.invoiceStatus ? "checkmark" : "close"} size={12} color="#fff" />
                    </View>
                  </View>

                  {/* Right column: labels + dates */}
                  <View style={{ marginLeft: 14, justifyContent: 'flex-start' }}>
                    {/* Order Received */}
                    <View style={{ marginBottom: 4 }}>
                      <ThemedText type="label" style={{ opacity: 0.5 }}>Order Received:</ThemedText>
                      <ThemedText style={{ fontSize: 14 }}>{new Date(item.orderDate).toLocaleDateString()}</ThemedText>
                    </View>

                    {/* Invoice Issued */}
                    <View>
                      <ThemedText type="label" style={{ marginTop: 6, opacity: 0.5 }}>Invoice Issued:</ThemedText>
                      <ThemedText style={{ fontSize: 14 }}>
                        {item.invoiceStatus
                          ? new Date(item.orderDate).toLocaleDateString()
                          : 'Invoice to be issued.'}
                      </ThemedText>
                    </View>
                  </View>
                </View>

                {/* Goods Total */}
                <ThemedText type="label" style={{ marginTop: 2, marginBottom: 6, opacity: 0.5 }}>Order Value:</ThemedText>
                <View style={[styles.row, { marginBottom: 16 }]}>
                  <ThemedText style={[{ fontWeight: 'bold' }]}>Total (Ex VAT):</ThemedText>
                  <ThemedText style={[{ fontWeight: 'bold' }]}>£{((item.goods + item.carriage) * 1.2).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ThemedText>
                </View>

                <Pressable
                  onPress={() => toggleOrder(item.orderId)}
                  style={[
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 10,
                      marginBottom: 6,
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      borderRadius: 8,
                      backgroundColor: colors.buttonBackgroundColor,
                    },
                  ]}
                >
                  {/* Left: text */}
                  <ThemedText style={{ fontSize: 16 }}>
                    {expandedOrders[item.orderId] ? 'Hide Item Lines' : 'Show Item Lines'}
                  </ThemedText>

                  {/* Right: chevron */}
                  <Ionicons
                    name={expandedOrders[item.orderId] ? 'chevron-up-outline' : 'chevron-down-outline'}
                    size={16}
                    color={colors.textColor}
                  />
                </Pressable>

                {/* Conditionally render itemLines + carriage */}
                {expandedOrders[item.orderId] && (
                  <View style={{ marginTop: 16 }}>

                    {/* Item lines */}
                    {item.itemLines?.map(line => (
                      <View
                        key={line.itemID}
                        style={[styles.row, { paddingHorizontal: 12, marginBottom: 4 }]}
                      >
                        <ThemedText style={{ flex: 1, fontSize: 14 }}>
                          {line.qty} x {line.itemName}
                        </ThemedText>
                        <ThemedText style={{ fontSize: 14 }}>£{line.unitCost.toFixed(2)}</ThemedText>
                      </View>
                    ))}

                    {/* Optional divider */}
                    <View
                      style={{
                        height: 1,
                        backgroundColor: colors.borderColor,
                        marginTop: 4,
                        marginBottom: 8,
                        opacity: 0.4,
                      }}
                    />

                    {/* Carriage */}
                    <View style={[styles.row, { paddingHorizontal: 12, marginBottom: 8 }]}>
                      <ThemedText style={{ flex: 1, fontSize: 14 }}>
                        Carriage ({shippingLabel})
                      </ThemedText>
                      <ThemedText style={{ fontSize: 14 }}>£{item.carriage.toFixed(2)}</ThemedText>
                    </View>

                  </View>
                )}

              </ThemedView>
            </View>
          </ThemedView>
        </View>

        {/* Footer */}
        <Pressable
          onPress={() =>
            setAlertData({
              title: 'Coming Soon',
              message: 'Order details will be available in a future update.',
            })
          }
          style={[
            styles.cardFooter,
            { borderTopColor: colors.borderColor },
          ]}
        >
          <ThemedText style={{ fontSize: 16 }}>
            Order Details
          </ThemedText>

        </Pressable>

      </ThemedView>
    );
  }

  return (
    <ScreenWrapper style={{ paddingHorizontal: 14 }}>

      <ThemedText type="defaultSemiBold" style={{ marginTop: 20, marginBottom: 20, marginLeft: 8 }}>Active ({orders.length} Found)</ThemedText>
      
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadOrders} />
        }
        contentContainerStyle={styles.listContent}
      />

      <AlertModal
        visible={!!alertData}
        title={alertData?.title}
        message={alertData?.message ?? ''}
        buttons={[
          {
            text: 'OK',
            onPress: () => setAlertData(null),
          },
        ]}
      />

    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 0,
  },
  // Main item container
  itemContainer: {
    paddingTop: 6,
    paddingHorizontal: 2,
    borderRadius: 16,
  },
  cardContent: {
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 12,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  cardFooter: {
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderTopWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.1)', // subtle contrast
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
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
  statusIcon: {
    width: 22,
    height: 22,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});