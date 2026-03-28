import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeDashboardScreen from '../../screens/HomeDashboardScreen';
import {Text} from '../../components/primitives';
import {colors, borderRadius} from '../../theme';

export type MainTabsParamList = {
  Home: undefined;
  History: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

function PlaceholderScreen({title}: {title: string}) {
  return (
    <View style={styles.placeholder}>
      <Text variant="headlineMd" color={colors.onSurfaceVariant}>
        {title}
      </Text>
      <Text variant="bodySm" color={colors.outline}>
        Coming soon
      </Text>
    </View>
  );
}

function HistoryScreen() {
  return <PlaceholderScreen title="History" />;
}

function AccountScreen() {
  return <PlaceholderScreen title="Account" />;
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Inter',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 72,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          backgroundColor:
            Platform.OS === 'ios'
              ? 'rgba(255, 255, 255, 0.85)'
              : 'rgba(255, 255, 255, 0.95)',
          borderTopWidth: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: 'absolute',
          shadowColor: 'rgba(74, 64, 224, 0.04)',
          shadowOffset: {width: 0, height: -4},
          shadowOpacity: 1,
          shadowRadius: 32,
          elevation: 8,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeDashboardScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    gap: 8,
  },
});
