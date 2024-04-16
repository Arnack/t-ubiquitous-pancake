import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Icon, IconProps, Layout, List, Text, Toggle, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsItem from '@/components/SettingsItem';
import { useTheme } from '@/utilities/context/theme-context';
import { useAppContext } from '@/utilities/context/app-context';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import i18n from '@/utilities/localizations/i18n';

export default function TabSettingsScreen() {

  const { theme, toggleTheme } = useTheme();
  const { kittenTheme } = useAppContext();


  const saveIcon = (props: IconProps) => <Icon {...props} name='download-outline' />;

  const darkToggle = () => <Toggle
    checked={theme == "dark"}
    onChange={toggleTheme}
  >
  </Toggle>


  const languageRightAccessory = (props: IconProps) =>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <Text category='p2'>{i18n.t('lang-name')}</Text>
      <Icon {...props} name='chevron-right' />
    </View>

  // settings items
  const SettingsItems = {
    general: [
      {
        title: i18n.t('settings.language'),
        i18n: 'language',
        route: '../language',
        icon: 'info-outline',
        accessoryRight: languageRightAccessory,
      },

      {
        title: i18n.t('settings.dark-mode'),
        i18n: 'dark-mode',
        icon: 'eye-outline',
        onPress: toggleTheme,
        accessoryRight: darkToggle,
      },

    ],
    purchase: [
      {
        title: i18n.t('settings.restore-purchase'),
        i18n: 'restore-purchase',
        icon: 'shopping-bag-outline',
        route: '../restore-purchase',
      },
      {
        title: i18n.t('settings.purchase-history'),
        i18n: 'purchase-history',
        icon: 'file-text-outline',
        route: '../purchase-history',
      },
    ],
    about: [
      {
        title: i18n.t('settings.rate-us'),
        i18n: 'rate-us',
        icon: 'star-outline',
        onPress: () => {
          alert('about');
        },
      },
      {
        title: i18n.t('settings.about-app'),
        i18n: 'about-genai',
        route: '../about',
        icon: 'info-outline',
      },
      {
        title: i18n.t('settings.privacy-policy'),
        i18n: 'privacy-policy',
        route: '../privacy-policy',
        icon: 'shield-outline',
      },
      {
        title: i18n.t('settings.terms-of-service'),
        i18n: 'terms-of-service',
        route: '../terms-conditions',
        icon: 'file-text-outline',
      },
      {
        title: i18n.t('settings.contact-us'),
        i18n: 'contact-us',
        icon: 'phone-outline',
        onPress: () => {
          alert('contactUs');
        },
      },
    ],
  };

  const LogoutIcon = (props: IconProps) => <Icon {...props} name='log-out-outline' />;

  const LogoutAction = () => (
    <Link href={'.././'} asChild >
      <TopNavigationAction icon={LogoutIcon} />
    </Link>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        translucent={true}
        backgroundColor={kittenTheme['background-basic-color-1']}
      />
      <TopNavigation
        title={i18n.t('settings.title')}
        alignment='center'
        accessoryRight={LogoutAction}
      />
      <Divider />
      <Layout level='2' style={styles.container}>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20, paddingBottom: 15, }}>
          <Layout level='1' style={styles.section}>
            <List
              scrollEnabled={false}
              style={styles.listConatiner}
              data={SettingsItems.general}
              renderItem={SettingsItem}
            />
          </Layout>

        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 8,
    flexDirection: 'column',
    gap: 22,
  },
  listConatiner: {
    flex: 1,
    width: '100%',
  },
  subtitle: {
    fontSize: 11,
  },
  section: {
    padding: 10,
    borderRadius: 4,

  },
});
