import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Button } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { ProductService } from '@/service/ProductService';
import { useCartStore } from '@/utilities/store/basketStore';

export default function CustomerProductView() {
    const [products, setProducts] = useState([]);
    const addToCart = useCartStore(state => state.addToCart);

    useEffect(() => {
        ProductService.fetchProducts().then(setProducts);
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        alert('Added to cart!'); // Optional: Replace with a more sophisticated feedback mechanism
    };

    const renderProduct = ({ item }) => (
        <Card style={styles.productTile} status='primary'>
            <Image
                style={styles.image}
                source={{ uri: item.image }}
            />
            <Text category='h6' style={styles.productName}>{item.name}</Text>
            <Text category='s1'>SKU: {item.SKU}</Text>
            <Text category='p2' style={styles.description}>{item.description}</Text>
            <Text category='p1' style={styles.price}>${item.price.toFixed(2)}</Text>
            <Button 
                title="Add to Basket"
                onPress={() => handleAddToCart(item)}
            />
        </Card>
    );

    return (
        <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProduct}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    productTile: {
        flex: 1,
        margin: 5,
        alignItems: 'center', // Ensure items are centered
    },
    image: {
        height: 150,
        width: '100%',
        marginBottom: 8,
    },
    productName: {
        fontWeight: 'bold',
    },
    description: {
        color: 'gray',
    },
    price: {
        marginTop: 5,
    },
});
