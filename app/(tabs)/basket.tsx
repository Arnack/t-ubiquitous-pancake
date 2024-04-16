import React from 'react';
import { FlatList, StyleSheet, View, Button, Image, Text } from 'react-native';
import { Layout, TopNavigation, Divider, Input } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/utilities/context/theme-context';
import { useToast } from 'react-native-toast-notifications';
import { OrderService } from '@/service/OrderService';
import { useCartStore } from '@/utilities/store/basketStore';

export default function BasketScreen() {
  const { theme } = useTheme();
  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);
  const toast = useToast();

  const handleCheckout = async () => {
    // Assuming a static user ID for demonstration; replace with dynamic user data as needed
    const orderData = {
      userId: 2,  // Static user ID, replace with actual user ID in your app
      goods: cart.map(item => ({ id: item.id, quantity: item.quantity }))
    };

    try {
      await OrderService.postOrder(orderData);
      clearCart();
      toast.show('Order placed successfully');
    } catch (error) {
      toast.show(error.message || 'Failed to place order');
    }
  };

  const renderItem = ({ item }) => (
    <Layout style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text>{item.name} - ${item.price}</Text>
        <Input
          value={item.quantity.toString()}
          onChangeText={(qty) => updateQuantity(item.id, parseInt(qty))}
          keyboardType='numeric'
          style={{ width: 40 }}
        />
        <Button title="Remove" onPress={() => removeFromCart(item.id)} />
      </View>
    </Layout>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      <TopNavigation title="Basket & Checkout" alignment="center" />
      <Divider />
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
      />
      <Button title="Checkout" onPress={handleCheckout} disabled={cart.length === 0} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 8,
  },
  item: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
