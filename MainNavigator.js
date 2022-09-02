import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import FarmerList from './screens/FarmerList';

import HomeScreen from './screens/HomeScreen';
import ModalScreen from './screens/ModalScreen';
import Requests from './screens/Requests';
import SplashScreen from './screens/SplashScreen';
import { useLogin } from './context/LoginProvider';
import RupeesLottie from './screens/Lottie/RupeesLottie';
import SplashScreenMain from './screens/SplashScreenMain';


const Stack = createNativeStackNavigator()


const InitScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='MainScreen' component={MainScreen} />
        </Stack.Navigator>
    )
}

const MainScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="SplashHome" component={SplashScreenMain} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Rupee" component={RupeesLottie}/>
            <Stack.Screen name="FarmerList" component={FarmerList} />
            <Stack.Screen name="Requests" component={Requests} />
        </Stack.Navigator>
    )
}

const MainNavigator = () => {
    const { isLoggedIn } = useLogin()

    console.log("isLoggedIn ---- ", isLoggedIn)

    return (
        isLoggedIn ? <MainScreen /> : <InitScreen />
        )

    
}

export default MainNavigator