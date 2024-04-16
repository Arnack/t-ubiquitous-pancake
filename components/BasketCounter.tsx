import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { Layout, Text } from '@ui-kitten/components'
import CustomeIcon from '@/utilities/icons/custome-icons'
import { Link } from 'expo-router'
import { useAppContext } from '@/utilities/context/app-context'
import { useCartStore } from '@/utilities/store/basketStore'

export default function BasketCounter() {
    const { kittenTheme } = useAppContext();

    const itemCount = 0

console.log('itemCount', itemCount);


    return (
        <Link href="/credits" asChild>
            <Pressable>
                <Layout level='3' style={styles.container}>
                    <CustomeIcon name='shopping-cart' pack="font-awesome5" color={kittenTheme['color-warning-default']} size={12} />
                    <Text category='s2'>{itemCount}</Text>
                </Layout>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
        gap: 12
    }
})