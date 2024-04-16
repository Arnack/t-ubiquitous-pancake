import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Divider, Layout, Text, TopNavigation, Card, Icon } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n from '@/utilities/localizations/i18n';
import { OrderService } from '@/service/OrderService';
import { ProductService } from '@/service/ProductService';
import { router } from 'expo-router';

export default function TabHistoryScreen() {
  const [orders, setOrders] = useState([]);
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOrders = await OrderService.fetchOrders();
        const fetchedGoods = await ProductService.fetchProducts();
        setGoods(fetchedGoods);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const getGoodsDetails = (goodsIds: number[]) => {
    return goodsIds.map(item => {
      const good = goods.find(g => g.id === item.id);
      return {
        ...good,
        quantity: item.quantity
      };
    });
  };

  return (
    <Layout level='2' style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation
          title={i18n.t('history.title')}
          alignment='center'
        />
        <Divider />
        <ScrollView style={styles.container}>
          {loading ? <Text>Loading...</Text> : orders.map((order) => (
            <Card
              style={styles.orderItem}
              key={order.id}
              onPress={() => router.navigate({ pathname: 'view-order', params: { orderId: order.id } })}
            >
              <Text category='h6' style={styles.orderTitle}>Order ID: {order.id}</Text>
              {getGoodsDetails(order.goods).map((item) => (
                <View key={item.id} style={styles.goodsItem}>
                  <Text>{item.name} (SKU: {item.SKU}) - Quantity: {item.quantity}</Text>
                </View>
              ))}
            </Card>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  orderItem: {
    marginBottom: 12,
    padding: 16,
  },
  orderTitle: {
    marginBottom: 8,
  },
  goodsItem: {
    paddingLeft: 16,
  },
  subtitle: {
    fontSize: 12,
  },
});
