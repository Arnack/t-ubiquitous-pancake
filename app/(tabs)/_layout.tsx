import React, { useState, useEffect } from 'react';
import { Link, Tabs } from 'expo-router';
import { BottomNavigation, BottomNavigationTab, Button, IconProps, Layout, Text } from '@ui-kitten/components';
import CustomeIcon from '@/utilities/icons/custome-icons';
import i18n from '@/utilities/localizations/i18n';
import { AuthService } from '@/service/AuthService';

const routes = [
  { name: "home", icon: 'home-outline', route: 'index', roles: ['customer', 'admin'] },
  { name: "orderHistory", icon: 'clock-outline', route: 'history', roles: ['admin'] },
  { name: "basket", icon: 'shopping-cart-outline', route: 'basket', roles: ['customer'] },
  { name: "settings", icon: 'settings-outline', route: 'settings', roles: ['customer', 'admin']},
];

export default function TabLayout() {
  const role = AuthService.getUserRole();

  const accessibleRoutes = routes.filter(route => role && route.roles.includes(role));

  return (
    <Tabs
      tabBar={props => <BottomTabBar {...props} routes={accessibleRoutes} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='index'
    >
      {
        accessibleRoutes.map((route: any, index: number) => {
          return (
            <Tabs.Screen
              options={{
                tabBarLabel: ({ color }) => (
                  <Text category='h6' style={{ color }}>
                    {i18n.t(`tabs.${route.name}`)}
                  </Text>
                ),
              }}
              key={index}
              name={route.route}
            />
          )
        })
      }
    </Tabs>
  );
}

const BottomTabBar = ({ navigation, state }: any) => {

  const role = AuthService.getUserRole();

  const accessibleRoutes = routes.filter(route => role && route.roles.includes(role));

  return (
  <BottomNavigation
    indicatorStyle={{ height: 1 }}
    selectedIndex={state.index}
    onSelect={index => {
      console.log('index', index);
      console.log('accessibleRoutes', accessibleRoutes[index], accessibleRoutes);
      
      navigation.navigate(accessibleRoutes[index].route)
    }}
  >

    {
      accessibleRoutes.map((route: any, index: number) => {
        return (
          <BottomNavigationTab
            key={index}
            title={i18n.t(`tabs.${route.name}`)}
            icon={
              (props: IconProps) => {
                return (
                  <CustomeIcon
                    size={props.style?.width}
                    name={route.icon}
                    pack={route.pack}
                    color={props.style.tintColor}
                  />)
              }
            }
          />
        )
      })
    }
  </BottomNavigation>)
};
