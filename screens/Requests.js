import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, ImageBackground, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import CUstomAnimatedLoader from '../components/CustomAnimatedLoader';
import CustomFarmerList from '../components/CustomFarmerList';
import CustomHeader from '../components/CustomHeader';
import CustomRequestList from '../components/CustomRequest';


const { height, width } = Dimensions.get('window')

const Requests = ({ navigation }) => {

    const [penRequests, setPenRequests] = useState('')
    const [status, setStatus] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const fetchApi = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await axios.post("http://printrly.com/public/api/fcenter/order/get", {
                Headers: {
                    authorization: `Bearer ${token}`
                }
            })
            if (res.data) {
                // console.log("res.data ---- ", res.data)
                setPenRequests(res.data)
            }
            // console.log(penRequests)
        } catch (error) {
            console.log(error)
        }
    }

    const refresh = () => {
        fetchApi()
        setStatus(false)
        navigation.navigate('Rupee')
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchApi()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000);
    }

    useEffect(() => {
        fetchApi()
    }, [])

    return (
        <ImageBackground
            source={require('../assets/Background.png')}
            style={{ flex: 1 }}
        >
            <CustomHeader back={true} navigation={navigation} />
            <View style={{ marginTop: 40 }} >
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    keyboardShouldPersistTaps="always"
                    nestedScrollEnabled={true}
                >
                    <Text style={{ color: '#000', fontSize: 21, marginLeft: 20 }}>
                        Today's Pending Requests
                    </Text>
                    <View style={{ height: 1, backgroundColor: '#000', marginLeft: 20, marginRight: width / 3 }}>
                    </View>
                    <View style={{ flexDirection: 'column', marginTop: 40, marginBottom: 300 }}>
                        {
                            penRequests
                                ?
                                status
                                    ?
                                    refresh()
                                    :
                                    penRequests.data.map((item, i) => {
                                        return (
                                            item.status_format == 'paid' ? null : <CustomRequestList status={setStatus} item={item} key={i} />
                                        )
                                    })
                                :
                                <CUstomAnimatedLoader />
                        }
                        {/* <CustomRequestList /> */}
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

export default Requests