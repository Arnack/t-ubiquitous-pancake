import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Divider, Text } from '@ui-kitten/components'


interface SettingsDividerProps {
    title: string
}



export default function SettingsDivider({
    title
}: SettingsDividerProps) {
    return (
        <View style={styles.container}>
            <Text category='p2' style={{ opacity: .5 }}>{title}</Text>
            <Divider style={{ width: '100%' }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 4,
        alignItems: 'center',
        gap: 15,
    }
})