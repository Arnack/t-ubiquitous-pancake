import { useAppContext } from '@/utilities/context/app-context';
import { useTheme } from '@/utilities/context/theme-context';
import i18n from '@/utilities/localizations/i18n';
import { Button, Divider, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { Link, Stack, router, usePathname } from 'expo-router';
import { Screen } from 'expo-router/build/views/Screen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function NotFoundScreen() {
  const { theme } = useTheme();
  const { kittenTheme, } = useAppContext();

  const pathName = usePathname()


  return (
    <Layout level='2' style={{ flex: 1 }}>
      <Screen options={{ headerShown: false }} />
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={kittenTheme['background-basic-color-2']}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation
          title={i18n.t('not-found.title', { defaultValue: 'Page Not found' })}
          alignment='center'
        />
        <Divider />
        <Layout level='2' style={styles.container}>
          <Button
            size='tiny'
            appearance='outline'
            status='basic'
          >{pathName}</Button>
          <Text style={{ textAlign: 'center' }}>{i18n.t('not-found.message', { defaultValue: "Sorry, we couldn't find the page you're looking for." })}</Text>
          <Link href={"./(tabs)"} asChild >
            <Button>{i18n.t('not-found.link', { defaultValue: 'Go back home' })}</Button>
          </Link>

        </Layout>
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 9,
    flexDirection: 'column',
    gap: 22,
  },
  listConatiner: {
    flex: 1,
    width: '100%',
  },
});

