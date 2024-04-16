import React from 'react';
import { Icon, IconElement, IconProps, ListItem, } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';



const LanguageItem = ({ item, index }: any) => {
    // check icon
    const CheckIcon = (props: IconProps): IconElement => (
        <Icon
            {...props}
            name={item.selected ? 'checkmark-circle-2-outline' : 'radio-button-off-outline'}
        />
    );

    return (
        <Link href={"../"} push asChild>
            <ListItem
                onPress={item.onPress}
                title={item.name}
                style={styles.container}
                accessoryRight={CheckIcon}
            />
        </Link>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        borderRadius: 2
    },
});


export default LanguageItem