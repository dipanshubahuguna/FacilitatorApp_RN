import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Dimensions, ImageBackground, ScrollView, TouchableOpacity, TextInput, Alert, RefreshControl } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { height, width } = Dimensions.get('window')

const CustomRequestList = ({ item, status, navigation }) => {


    const animationRef = useRef()

    useEffect(() => {
        animationRef.current?.play();
    }, []);

    console.log(item)

    const [toggleQ, setToggleQ] = useState(false)
    const [toggleT, setToggleT] = useState(false)
    const [quantity, setQuantity] = useState('')
    const [RNum, setRNum] = useState('')
    const [mode, setMode] = useState('')

    const check = () => {
        if (toggleT && toggleQ && quantity && RNum) {
            return true
        } else {
            return false
        }
    }


    const fetchApiOnline = async () => {
        try {
            const data = JSON.stringify({
                r_qty: quantity,
                mode: "online",
                six_r: RNum,
                q: '1',
                tax: '1'
            })
            // console.log(`http://printrly.com/public/api/fcenter/order/proceed/${item.sc_number}`)
            const token = await AsyncStorage.getItem('token')
            // console.log(data)
            // console.log(token)
            const res = await axios.post(`http://printrly.com/public/api/fcenter/order/proceed/${item.sc_number}`, data, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                }
            })
            // console.log("res.data in CustomRequest ------", res.data.message.split(' ')[2])
            if (res.data.message.split(' ')[2] == 'successfully') {
                status(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchApiCash = async () => {
        try {
            const data = JSON.stringify({
                r_qty: quantity,
                mode: "cash",
                six_r: RNum,
                q: '1',
                tax: '1'
            })
            // console.log(`http://printrly.com/public/api/fcenter/order/proceed/${item.sc_number}`)
            const token = await AsyncStorage.getItem('token')
            // console.log(data)
            // console.log(token)
            const res = await axios.post(`http://printrly.com/public/api/fcenter/order/proceed/${item.sc_number}`, data, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                }
            })
            // console.log("res.data in CustomRequest ------", res.data.message.split(' ')[2])
            if (res.data.message.split(' ')[2] == 'successfully') {
                status(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ScrollView
            horizontal={true}
            keyboardShouldPersistTaps="always"
            nestedScrollEnabled={true}
        >{
            item.mode == 'cash' && item.six_r
            ?
            null
            :

            <View style={{ flexDirection: 'column' }}>
                <View style={{ borderColor: '#000', height: 120, flexDirection: 'column', borderBottomWidth: 0.7, borderLeftWidth: 0.2, marginLeft: 10, marginRight: 10, borderRightWidth: 0.2 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', height: '100%', marginLeft: 10 }}>
                            <Text style={{ color: '#000', paddingLeft: 5, fontSize: 13 }}>
                                Farmer ID : {item.farmer_id}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{}}>
                            <Text style={{ color: '#000', padding: 10 }}>
                                Name
                            </Text>
                            <Text style={{ color: '#000', padding: 10, paddingTop: 5 }}>
                                {
                                    item.farmer
                                        ?
                                        item.farmer.name
                                        :
                                        <Text style={{ color: '#000' }}>
                                            .......
                                        </Text>
                                }
                            </Text>
                        </View>
                        <View style={{}}>
                            <Text style={{ color: '#000', padding: 10 }}>
                                S/C
                            </Text>
                            <Text style={{ color: '#000', padding: 10, paddingTop: 5 }}>
                                {item.sc_number}
                            </Text>
                        </View>
                        <View style={{}}>
                            <Text style={{ color: '#000', padding: 10 }}>
                                Qty
                            </Text>
                            <Text style={{ color: '#000', padding: 10, paddingTop: 5 }}>
                                {item.g_qty}
                                {item.six_r}
                            </Text>
                        </View>
                        <View style={{}}>
                            <Text style={{ color: '#000', padding: 7 }}>
                                Qty Received
                            </Text>
                            {
                                item.r_qty == 0
                                    ?
                                    <>
                                        <TextInput
                                            value={quantity}
                                            onChangeText={setQuantity}
                                            style={{
                                                flex: 1,
                                                color: '#000'
                                            }}
                                        />
                                        <View
                                            style={{
                                                height: 1,
                                                backgroundColor: '#000'
                                            }}
                                        >
                                        </View>
                                    </>
                                    :
                                    <>
                                        <Text style={{
                                            flex: 1,
                                            color: '#000',
                                            marginTop: 10
                                        }}>
                                            {item.r_qty}
                                        </Text>
                                        <View
                                            style={{
                                                height: 1,
                                                backgroundColor: '#000'
                                            }}
                                        >
                                        </View>
                                    </>
                            }
                        </View>
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={{ color: '#000', padding: 7 }}>
                                6R Number
                            </Text>
                            {
                                item.six_r
                                    ?
                                    <>
                                        <Text style={{
                                            flex: 1,
                                            color: '#000',
                                            marginTop: 10,
                                        }}>
                                            {item.six_r}
                                        </Text>
                                        <View
                                            style={{
                                                height: 1,
                                                backgroundColor: '#000',
                                                marginRight: 10
                                            }}
                                        >
                                        </View>
                                    </>
                                    :
                                    <>
                                        <TextInput
                                            value={RNum}
                                            onChangeText={setRNum}
                                            style={{
                                                flex: 1,
                                                color: '#000'
                                            }}
                                        />
                                        <View
                                            style={{
                                                height: 1,
                                                backgroundColor: '#000'
                                            }}
                                        >
                                        </View>
                                    </>
                            }
                        </View>
                        {
                            item.six_r
                                ?
                                null
                                :
                                <>
                                    <View style={{ paddingLeft: 20 }}>
                                        <TouchableOpacity onPress={() => {
                                            setToggleQ(!toggleQ)
                                        }}>
                                            <Text style={{ color: '#000', fontWeight: '600', padding: 10 }}>
                                                Q
                                            </Text>
                                            {
                                                toggleQ
                                                    ?
                                                    <Image
                                                        source={require('../assets/check_box_FILL0_wght400_GRAD0_opsz48.png')}
                                                        style={{ height: 20, width: 20, padding: 15, }}
                                                    />
                                                    :
                                                    <Image
                                                        source={require('../assets/check_box_outline_blank_FILL0_wght400_GRAD0_opsz48.png')}
                                                        style={{ height: 20, width: 20, padding: 15 }}
                                                    />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ paddingLeft: 20 }}>
                                        <TouchableOpacity onPress={() => {
                                            setToggleT(!toggleT)
                                        }}>
                                            <Text style={{ color: '#000', fontWeight: '600', padding: 10 }}>
                                                T
                                            </Text>
                                            {
                                                toggleT
                                                    ?
                                                    <Image
                                                        source={require('../assets/check_box_FILL0_wght400_GRAD0_opsz48.png')}
                                                        style={{ height: 20, width: 20, padding: 15 }}
                                                    />
                                                    :
                                                    <Image
                                                        source={require('../assets/check_box_outline_blank_FILL0_wght400_GRAD0_opsz48.png')}
                                                        style={{ height: 20, width: 20, padding: 15 }}
                                                    />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </>
                        }
                    </View>
                </View>
                {
                    item.six_r
                        ?
                        item.mode == 'cash'
                            ?
                            <View style={{ marginLeft: width / 2, flexDirection: 'row' }}>
                                <View style={{
                                    height: 20,
                                    width: 170,
                                    borderRadius: 7,
                                    backgroundColor: 'rgba(50,166,85,255)',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    marginBottom: 10,
                                }}>
                                    <Text style={{ color: '#fff' }}>
                                        Cash Paid 
                                    </Text>
                                </View>
                            </View>
                            :
                            <View style={{ marginLeft: width / 2, flexDirection: 'row' }}>
                                <View style={{
                                    height: 20,
                                    width: 170,
                                    borderRadius: 7,
                                    backgroundColor: 'rgba(50,166,85,255)',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    marginBottom: 10,
                                }}>
                                    <Text style={{ color: '#fff' }}>
                                        Online Payment Pending 
                                    </Text>
                                </View>
                                <LottieView
                                    style={{ height: 26, width: 26, alignSelf: 'center', paddingLeft: 10 }}
                                    source={require('../assets/lf30_editor_dommygk5.json')}
                                    ref={(animation) => {
                                        animationRef.current = animation;
                                    }}
                                    autoPlay
                                    loop
                                />
                            </View>
                        :
                        <>
                            <View style={{ flexDirection: 'row', padding: 10, marginLeft: width / 1.7, paddingTop: 15 }}>
                                <View style={{
                                    height: 20,
                                    width: 70,
                                    borderRadius: 7,
                                    backgroundColor: 'rgba(257,138,53,255)',
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (check()) {
                                                fetchApiOnline()
                                            } else {
                                                Alert.alert('Fill all necessary details')
                                            }
                                        }}
                                    >
                                        <Text style={{ color: '#fff' }}>
                                            Pay Online
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    height: 20,
                                    width: 70,
                                    borderRadius: 7,
                                    backgroundColor: 'rgba(254,138,53,255)',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: 20
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (check()) {
                                                fetchApiCash()
                                            } else {
                                                Alert.alert('Fill all necessary details')
                                            }
                                        }}
                                    >
                                        <Text style={{ color: '#fff' }}>
                                            Pay Cash
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                }
            </View>
        }
        </ScrollView>
    )
}

export default CustomRequestList