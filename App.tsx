/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image 
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon  from 'react-native-vector-icons/FontAwesome';

import * as Font from 'expo-font';
import Partidos from './src/Partidos'; 
import Mensajes from './src/Mensajes';
import Perfil from './src/Perfil';


//const Stack = createStackNavigator();
//const Stack = createNativeStackNavigator(); 
const Tab = createBottomTabNavigator();

function App() {
  

  return (
    
    
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Partidos">
        <Tab.Screen name="Partidos" component={Partidos} 
         options={{tabBarLabel: 'Partidos',tabBarIcon: ({ color, size }) => (
         <Image source={require('./img/raqueta.png')} style={{ width: 50, height: 50 }}/>),}}/>
        
        <Tab.Screen name="Mensajes" component={Mensajes} 
         options={{tabBarLabel: 'Mensajes',tabBarIcon: ({ color, size }) => (
          <Image source={require('./img/sms.png')} style={{ width: 50, height: 50 }}/>),}} />

        <Tab.Screen name="Perfil" component={Perfil} 
         options={{tabBarLabel: 'Perfil',tabBarIcon: ({ color, size }) => (
          <Image source={require('./img/perfil.png')} style={{ width: 50, height: 50 }}/>),}}/>
      </Tab.Navigator>
    </NavigationContainer>
    
    
    
  );
}



export default App;
