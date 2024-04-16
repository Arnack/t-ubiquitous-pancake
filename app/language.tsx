import { ScrollView, StyleSheet } from 'react-native';

import { Divider, Icon, IconProps, Layout, List, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Screen } from 'expo-router/build/views/Screen';
import LanguageItem from '@/components/LanguageItem';
import { useAppContext } from '@/utilities/context/app-context';
import i18n from '@/utilities/localizations/i18n';
import * as Langs from '../constants/languages/langs.json'

export default function ProScreen() {
    // get app context
    const { appData, changeLanguage } = useAppContext();

    // get current language code
    const code = appData.language.code;

    // back icon
    const BackIcon = (props: IconProps) => (
        <Icon {...props} name='arrow-back' />
    );

    // back action for top navigation
    const BackAction = () => (
        <Link href={"../"} asChild >
            <TopNavigationAction icon={BackIcon} />
        </Link>
    );

    // get Langs json obejct keys ignore "default" key
    const langCodes = Object.keys(Langs).filter(key => key !== 'default');


    // map lang codes to lang names and create an array of objects
    const languages = langCodes.map(code => ({ code, name: i18n.t("lang-name", { locale: code }) }));

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Screen
                options={{
                    headerShown: false,
                }}
            />
            <TopNavigation
                title={i18n.t("language.title")}
                alignment='center'
                accessoryLeft={BackAction}
            />
            <Divider />
            <Layout level='2' style={styles.container}>
                <List
                    scrollEnabled={true}
                    style={styles.listConatiner}
                    data={languages.map(language => ({ ...language, selected: language.code === code, onPress: () => changeLanguage(language) }))}
                    renderItem={LanguageItem}
                />
            </Layout>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        paddingHorizontal: 9,
        flexDirection: 'column',
        gap: 22,
    },
    listConatiner: {
        flex: 1,
        width: '100%',
    },
});
