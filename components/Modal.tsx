import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, Modal as KittenModal } from '@ui-kitten/components'

interface ModalProps {
    visible: boolean
    onBackdropPress: () => void
}


export default function Modal({
    visible,
    onBackdropPress,
    ...props
}: ModalProps & { children: React.ReactNode }) {
    return (
        <KittenModal
            visible={visible}
            backdropStyle={styles.backdrop}
            // animationType='fade'
            onBackdropPress={onBackdropPress}
        >
            {props.children}
        </KittenModal>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})