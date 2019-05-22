/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { storageFactory } from './Storage';
global.localStorage = storageFactory;
global.localStorage.memory = true;
global.localStorage.setItem('wallet:server', 'http://localhost:8080/v1a/');

import '../shim.js'

import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
//import {StyleSheet, Text, View} from 'react-native';

import { store, networkError } from './hathorRedux';
import SplashScreen from './screens/SplashScreen';
import { WelcomeScreen, InitialScreen, NewWordsScreen, LoadWordsScreen } from './screens/InitWallet';
import MainScreen from './screens/MainScreen';
import { SendScreen, SendScreenModal } from './screens/Send';
import { ReceiveScreenModal, ReceiveScreen } from './screens/Receive';
import HathorLogo from './components/HathorLogo';

//import hathorLib from '@hathor/wallet-lib';
const hathorLib = require('@hathor/wallet-lib');
global.hathorLib = hathorLib;

const InitStack = createStackNavigator(
  {
    WelcomeScreen,
    InitialScreen,
    NewWordsScreen,
    LoadWordsScreen,
  },
  {
    initialRouteName: 'WelcomeScreen',
    defaultNavigationOptions: {
      headerTitle: <HathorLogo />,
    }
  }
);

const TabNavigator = createBottomTabNavigator({
    Home: MainScreen,
    Send: SendScreen,
    Receive: ReceiveScreen,
    //Settings: MainScreen,
  }, {
    initialRoute: 'MainScreen',
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#0273a0',
      },
    },
});

const AppStack = createStackNavigator({
    Main: TabNavigator,
    SendModal: SendScreenModal,
    ReceiveScreenModal: ReceiveScreenModal,
  }, {
    mode: 'modal',
    headerMode: 'none',
});

const SwitchNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    App: AppStack,
    Init: InitStack,
  }, {
    initialRouteName: 'Splash',
    //initialRouteName: 'Init',
});

const NavigationContainer = createAppContainer(SwitchNavigator);

const App = () => (
  <Provider store={store}>
    <NavigationContainer />
  </Provider>
)

// custom interceptor for axios
const createRequestInstance = (resolve, timeout) => {
  const instance = global.hathorLib.axios.defaultCreateRequestInstance(resolve, timeout);

  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    // Adding conditional because if the server forgets to send back the CORS
    // headers, error.response will be undefined
    store.dispatch(networkError(Date.now()));
    return Promise.reject(error);
  });
  return instance;
}
global.hathorLib.axios.registerNewCreateRequestInstance(createRequestInstance);

export default App;