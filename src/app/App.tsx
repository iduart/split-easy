import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './store';
import RootNavigator from './navigation/RootNavigator';
import {colors} from '../theme';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.surface}
          translucent={false}
        />
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
