import { ScrollView, StyleSheet, View } from 'react-native';

import { BottomNavigationTab, Button, Card, Icon, IconProps, Input, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/utilities/context/theme-context';
import { useAppContext } from '@/utilities/context/app-context';
import { StatusBar } from 'expo-status-bar';
import i18n from '@/utilities/localizations/i18n';
import { Link, router } from 'expo-router';
import BasketCounter from '@/components/BasketCounter';
import React from 'react';
import CustomeIcon from '@/utilities/icons/custome-icons';
import HomeSection from '@/components/HomeSection';
import { AuthService } from '@/service/AuthService';
import AdminProductView from '@/components/AdminProductView';
import CustomerProductView from '@/components/CustomerProductView';

export default function TabChatScreen() {
  const { theme } = useTheme();
  const { kittenTheme, } = useAppContext();

  const role = AuthService.getUserRole();

  const creditsRender = () => {
    if (role === 'customer') {
      return (
        <BasketCounter />
      )
    }
  };

  const renderLeftAccessory = () => {
    return (
      <View style={{
        marginRight: 8,
        alignItems: "center",
        flexDirection: "row",
        gap: 11,
        justifyContent: "center",
      }}>
        <Text category='h5' status='primary'>
          Goods
        </Text>
      </View>
    )
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={kittenTheme['background-basic-color-1']}
      />
      <TopNavigation
        title={renderLeftAccessory}
        alignment='center'
        accessoryRight={creditsRender}
      />
      <Layout level='2' style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainerStyle}>
          {
            role === 'admin' ?
              <AdminProductView /> :
              <CustomerProductView />
          }
        </ScrollView>
      </Layout>
    </SafeAreaView >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 9,
    flexDirection: 'column',
  },
  button: {
    marginVertical: 30,
  },
  contentContainerStyle: {
    paddingBottom: 22,
  },
});
