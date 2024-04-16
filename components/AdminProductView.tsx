import { ProductService } from '@/service/ProductService';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, List, ListItem, Text } from '@ui-kitten/components';
import { router } from 'expo-router';

interface Product {
    id: number;
    name: string;
    SKU: string;
    description: string;
    price: number;
}

export default function AdminProductView() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        ProductService.fetchProducts().then(setProducts);
    }, []);

    const renderProductItem = ({ item }: {item: Product}) => (
        <ListItem
            style={styles.listItem}
            title={evaProps => <Text {...evaProps} style={styles.productName}>{item.name}</Text>}
            description={evaProps => (
                <>
                    <Text {...evaProps}>SKU: {item.SKU}</Text>
                    <Text {...evaProps}>{item.description}</Text>
                    <Text {...evaProps}>${item.price.toFixed(2)}</Text>
                </>
            )}
            accessoryRight={() => (
                <Button
                    size="small"
                    status='primary'
                    appearance='outline'
                    onPress={() => router.navigate({ pathname: 'edit-product', params: { productId: item.id }})}
                > 
                    <Text>Edit</Text>
                </Button>
            )}
        />
    );

    return (
        <List
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProductItem}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        paddingVertical: 8,
    },
    listItem: {
        marginVertical: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    productName: {
        fontWeight: 'bold',
    },
});
