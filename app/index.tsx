import { StyleSheet, View } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '@/utilities/context/app-context';
import { useTheme } from '@/utilities/context/theme-context';
import i18n from '@/utilities/localizations/i18n';
import { AuthService } from '@/service/AuthService';
import { router } from 'expo-router';

export default function ProScreen() {
    const { theme } = useTheme();
    const { kittenTheme } = useAppContext();

    const handleLogin = async (role: string) => {
        try {;
            const userData = await AuthService.login({ username: role, password: role });
            console.log('User logged in:', userData);

            router.replace('/(tabs)')

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                style={theme === 'light' ? 'dark' : 'light'}
                translucent={true}
                backgroundColor={kittenTheme['background-basic-color-2']}
            />
            <Layout level='2' style={styles.container}>
                <View style={{ width: '100%', gap: 8 }} >
                    <Button
                        appearance='outline' status='basic'
                        onPress={() => handleLogin('customer@customer.customer')}>
                        {i18n.t('start.buttons.customer-sign-in')}
                    </Button>
                    <Button
                        appearance='outline'
                        onPress={() => handleLogin('admin@admin.admin')}>
                        {i18n.t('start.buttons.admin-sign-in')}
                    </Button>
                </View>
            </Layout>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 33,
        flexDirection: 'column',
        gap: 22,
    },
    input: {
        width: '80%',
        marginVertical: 8,
    },
    text: {
        textAlign: 'center',
    },
});
