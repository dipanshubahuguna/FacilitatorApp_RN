import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { signOut } from '../api/user';
import { useLogin } from '../context/LoginProvider';


const { height, width } = Dimensions.get('window')

const CustomHeader = ({ profile, back, navigation, signout }) => {
    const { setIsLoggedIn } = useLogin()
    return (
        <View style={{ flexDirection: 'row' }}>
            {
                back == true ?
                    <View style={{ marginTop: 20, flexDirection: 'row' }}>
                        <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <Image style={[{ height: 30, width: 30 }]} source={require('../assets/Back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '70%' }}>
                        </View>
                        <View style={{ width: '15%' }}>
                            <Image style={[{ height: 50, width: 50 }]} source={require('../assets/Dp.png')} />
                        </View>
                    </View>
                    :
                    <View style={{ marginTop: 20, flexDirection: 'row' }}>
                        <View style={{ width: '15%' }}>
                        </View>
                        <View style={{ width: '70%' }}>
                        </View>
                        <View style={{ width: '15%', alignSelf: 'center' }}>
                            {
                                signout
                                    ?
                                    <TouchableOpacity
                                        onPress={async () => {
                                            const isLoggedOut = await signOut()
                                            if (isLoggedOut) {
                                                setIsLoggedIn(false)
                                            }
                                        }}
                                    >
                                        <Image style={[{ height: 30, width: 30 }]} source={require('../assets/logout.png')} />
                                    </TouchableOpacity>
                                    :
                                    <Image style={[{ height: 50, width: 50 }]} source={require('../assets/Dp.png')} />
                            }
                        </View>
                    </View>
            }
        </View>
    )
}


export default CustomHeader