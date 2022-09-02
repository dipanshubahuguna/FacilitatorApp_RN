import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FarmerList from './screens/FarmerList';

import HomeScreen from './screens/HomeScreen';
import ModalScreen from './screens/ModalScreen';
import Requests from './screens/Requests';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import LoginProvider from './context/LoginProvider';
import MainNavigator from './MainNavigator';
import RupeesLottie from './screens/Lottie/RupeesLottie';


const Stack = createNativeStackNavigator();


const MainApp = () => {
  return (
    <LoginScreen />
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{ headerShown: false }}
    //     >
    //     <Stack.Screen name="Splash" component={SplashScreen} />
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="FarmerList" component={FarmerList} />
    //     <Stack.Screen name="Requests" component={Requests} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  )
}

const App = () => {

  // const fetchApi = async () => {
  //   try {
  //     const res = await fetch('http://printrly.com/public/api/fcenter/farmer/get',{
  //       method:'GET',
  //       headers: {
  //         Authorization: 'Bearer 300|dp9Hx1hC6Ol3MF7zBEYSylJrHb3tkz5DWHDQ8uHp',
  //       }
  //     })
  //     const resp = await res.json()
  //     console.log("res ----- ",resp)
  //   } catch (error) {
  //     console.log('Error ---- ',error)
  //   }
  // }

  // useEffect(()=>{
  //   fetchApi()
  // },[])
  return (
    // <RupeesLottie/>
    // <LoginProvider>
    // </LoginProvider>
    // // <MainApp/>
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
    // <MainNavigator/>
  )
}
export default App;
