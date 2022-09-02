import React, { Component, useState } from 'react';
import { View, Text, ImageBackground, Image, Dimensions, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { signIn } from '../api/user';
import { useLogin } from '../context/LoginProvider';
const { height, width } = Dimensions.get('window')

const LoginScreen = ({ navigation }) => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { setIsLoggedIn } = useLogin()

    const updateError = (error, stateUpdater) => {
        stateUpdater(error)
        setTimeout(() => {
            stateUpdater('')
        }, 2500)
    }

    return (
        <ImageBackground source={require('../assets/Background.png')} style={{ flex: 1 }}>
            <ScrollView
                keyboardShouldPersistTaps="always"
                nestedScrollEnabled={true}
            >
                <View style={{ alignSelf: 'center', marginTop: 40 }}>
                    <Image source={require('../assets/logo_150x100.png')} />
                </View>
                <View style={{ width: width - 60, alignSelf: 'center', marginTop: 30 }}>
                    <Text style={{ color: '#000', fontSize: 23, fontWeight: '500' }}>
                        Login Account
                    </Text>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>
                        Hello,Welcome back Admin
                    </Text>
                </View>
                {
                    error
                        ?
                        <View style={{ width: width - 60, marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'red', fontSize: 16 }}>
                                {error}
                            </Text>
                        </View>
                        :
                        null
                }
                <View style={{ width: width - 60, alignSelf: 'center', marginTop: 30 }}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>
                        Email
                    </Text>
                    <TextInput
                        style={email ? styles.activePlaceholder : styles.inactivePlaceholder}
                        placeholder="enter you email"
                        placeholderTextColor="grey"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', marginLeft: 20, marginTop: 20 }}>
                        Password
                    </Text>
                    <TextInput
                        style={{ borderColor: '#000', borderWidth: 0.5, borderRadius: 15, marginTop: 10, color: '#000' }}
                        placeholder="enter you password"
                        placeholderTextColor="grey"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={[styles.container]}
                        onPress={async () => {
                            try {
                                const res = await signIn({ email, password })
                                console.log("res in loginScreen ---", res)
                                if (res.error) {
                                    const err = res.error.split(".")[0]
                                    // console.log(err)
                                    updateError(err, setError)
                                }
                                // console.log("email",email)
                                // console.log("password",password)
                                if (res.message === "Success") {
                                    setIsLoggedIn(true)
                                }
                            } catch (error) {
                                console.log(error)
                            }

                        }}
                    >
                        <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    activePlaceholder: {
        borderColor: '#000',
        borderWidth: 0.5,
        borderRadius: 15,
        marginTop: 10,
        // paddingLeft:20,
        color: '#000'
    },
    inactivePlaceholder: {
        borderColor: '#000',
        borderWidth: 0.5,
        borderRadius: 15,
        marginTop: 10,
        color: '#000'
    },
    container: {
        height: 45,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(254,138,53,255)',
        marginTop: 40
    }
})

export default LoginScreen