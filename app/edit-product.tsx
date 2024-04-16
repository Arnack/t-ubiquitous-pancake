import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import {
  Button,
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
  const { productId } = route.params as { productId: number };

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
          Edit Product
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

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await ProductService.fetchProductById(productId);
        setProduct(result);
        setLoading(false);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSave = async () => {
    if (product) {
      setLoading(true);
      try {
        await ProductService.updateProduct(product.id || 0, product);
        Alert.alert("Success", "Product updated successfully");
        setLoading(false);
      } catch (error) {
        Alert.alert("Error", "Failed to update product");
        setLoading(false);
      }
    }
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
          <Input
            label="Name"
            value={product?.name}
            onChangeText={(text) => setProduct({ ...product, name: text })}
          />
          <Input
            label="SKU"
            value={product?.SKU}
            onChangeText={(text) => setProduct({ ...product, SKU: text })}
          />
          <Input
            label="Description"
            value={product?.description}
            multiline={true}
            textStyle={{ minHeight: 64 }}
            onChangeText={(text) =>
              setProduct({ ...product, description: text })
            }
          />
          <Input
            label="Price"
            value={product?.price?.toString()}
            keyboardType="numeric"
            onChangeText={(text) =>
              setProduct({ ...product, price: parseFloat(text) })
            }
          />
          <Button style={styles.button} onPress={handleSave}>
            Save Changes
          </Button>
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
  button: {
    marginVertical: 10,
  },
});
