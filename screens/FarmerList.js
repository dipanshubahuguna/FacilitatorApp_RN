import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, Touchable, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import CUstomAnimatedLoader from '../components/CustomAnimatedLoader';
import CustomFarmerList from '../components/CustomFarmerList';
import CustomHeader from '../components/CustomHeader';

const { height, width } = Dimensions.get('window')

const FarmerList = ({ navigation }) => {

    const [farmerList, setFarmerList] = useState('')
    const [bg, setBG] = useState(0)

    const [refreshing, setRefreshing] = useState(false);

    const fetchApi = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log(token)
        try {
            const res = await axios.get('http://printrly.com/public/api/fcenter/farmer/get', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            // await setFarmerList(resp)
            // return resp
            if (res.data) {
                // console.log("resp ------", res.data)
                setFarmerList(res.data)
            }
            // setFarmerList(() => {
            //     return res.data
            // })
            // console.log("res2----- ", farmerList)
        } catch (error) {
            console.log('Error ---- ', error)
        }
    }
    
    useEffect(() => {
        fetchApi()
    }, [])

    const onRefresh = () => {
        setRefreshing(true)
        fetchApi()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000);
    }

    return (
        <ImageBackground
            source={bg ? require('../assets/greyBG.jpg') : require('../assets/Background.png')}
            style={{ flex: 1 }}
        >
            <CustomHeader back={true} navigation={navigation} />
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
                <View style={{ flexDirection: 'column', marginTop: 50, marginBottom: 200 }}>
                    {
                        farmerList
                            ?
                            farmerList.data.map((item, i) => {
                                return (
                                    <CustomFarmerList key={i} setBG={setBG} item={item} farmerId={item.id} name={item.name} city={item.city} />
                                )
                            })
                            :
                            <CUstomAnimatedLoader />
                    }
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default FarmerList



// button: {
//     height: 45,
//     width: width - 50,
//     marginTop: 30,
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//     borderRadius: 20,
//     backgroundColor: 'rgba(254,138,53,255)'
//   }