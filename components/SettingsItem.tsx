import React from 'react';
import { Icon, IconElement, IconProps, ListItem, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

const SettingsItem = ({ item, index }: any) => {
    // const navigation = useNavigation();
    const renderIcon = (props: IconProps): IconElement => <Icon {...props} name={item.icon} />;

    // Forwarding icon
    const ForwardIcon = (props: IconProps): IconElement => (
        <Icon
            {...props}
            name='arrow-ios-forward'
        />
    );

    return item.route ? (
        <Link href={item.route} asChild>
            <ListItem
                title={item.title}
                style={styles.container}
                accessoryLeft={renderIcon}
                accessoryRight={item.accessoryRight ? item.accessoryRight : ForwardIcon}
            />
        </Link>
    ) : (
        <ListItem
            onPress={item.onPress}
            title={item.title}
            style={styles.container}
            accessoryLeft={renderIcon}
            accessoryRight={item.accessoryRight ? item.accessoryRight : ForwardIcon}
        />);
};

const styles = StyleSheet.create({
    container: {},
});


export default SettingsItem