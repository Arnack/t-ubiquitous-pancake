import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import {
  Button,
  Card,
  Divider,
  Icon,
  IconProps,
  Input,
  Layout,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { ProductService } from "@/service/ProductService";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useAppContext } from "@/utilities/context/app-context";
import { useTheme } from "@/utilities/context/theme-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { OrderService } from "@/service/OrderService";

interface Product {
  id?: number;
  name?: string;
  SKU?: string;
  description?: string;
  price?: number;
}

interface Props {
  route: RouteProp<{ params: { productId: number } }, "params">;
  navigation: any;
}

export default function EditProductScreen() {
  const { theme } = useTheme();
  const { kittenTheme } = useAppContext();
  const route = useRoute();
  const { orderId } = route.params as { orderId: number };

  const renderTitle = () => {
    return (
      <View
        style={{
          marginRight: 8,
          alignItems: "center",
          flexDirection: "row",
          gap: 11,
          justifyContent: "center",
        }}
      >
        <Text category="h5" status="primary">
          View Order
        </Text>
      </View>
    );
  };

  const BackIcon = (props: IconProps) => <Icon {...props} name="arrow-back" />;

  const BackAction = () => (
    <Link href={"../"} asChild>
      <TopNavigationAction icon={BackIcon} />
    </Link>
  );

  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderAndProducts = async () => {
      try {
        const fetchedOrder = await OrderService.fetchOrderById(orderId);
        const fetchedProducts = await ProductService.fetchProducts();
        setOrder(fetchedOrder);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
      setLoading(false);
    };

    fetchOrderAndProducts();
  }, [orderId]);

  const getOrderItemDetails = (orderItem) => {
    const product = products.find(p => p.id === orderItem.id);
    return `${product.name} (SKU: ${product.SKU}) - Quantity: ${orderItem.quantity}`;
  };

  const calculateTotal = () => {
    return order.goods.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return total + (product.price * item.quantity);
    }, 0);
  };


  if (loading)
    return (
      <Layout style={styles.centered}>
        <Spinner />
      </Layout>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        style={theme === "light" ? "dark" : "light"}
        backgroundColor={kittenTheme["background-basic-color-1"]}
      />
      <TopNavigation
        accessoryLeft={BackAction}
        title={renderTitle}
        alignment="center"
      />
      <Layout level="2" style={styles.container}>
        <ScrollView>
        <Card disabled={true}>
        <Text category='h6'>Order Details</Text>
        <Divider style={styles.divider} />
        {order.goods.map((item, index) => (
          <Text key={index} style={styles.itemText}>
            {getOrderItemDetails(item)}
          </Text>
        ))}
        <Text category='s1' style={styles.total}>
          Total: ${calculateTotal().toFixed(2)}
        </Text>
      </Card>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 9,
    flexDirection: "column",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    marginVertical: 4,
  },
  total: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 8,
  },
});
