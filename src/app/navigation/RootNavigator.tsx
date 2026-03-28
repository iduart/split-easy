import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from '../store';
import SplashScreen from '../../screens/SplashScreen';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import ScanFlow from './ScanFlow';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  MainTabs: undefined;
  ScanFlow: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="ScanFlow" component={ScanFlow} />
    </Stack.Navigator>
  );
}
