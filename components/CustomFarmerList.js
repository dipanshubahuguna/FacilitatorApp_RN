import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';

import { View, Text, ImageBackground, ScrollView, TextInput, Modal, Dimensions, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';

import CustomModalInput from './CustomModalInput';

const { height, width } = Dimensions.get('window')


const CustomFarmerList = ({ farmerId, name, city, setBG, item, navigation }) => {

    console.log(item)


    const [modalVisible, setModalVisible] = useState(0);
    const [qty, setQty] = useState('')
    const [msg, setMsg] = useState('')
    const [nameFarmer, setNameFarmer] = useState('')
    const [phone, setPhone] = useState('')
    const [ifsc, setIfsc] = useState('')
    const [acNum, setAcNum] = useState('')

    const fetchApi = async () => {
        try {
            const fc_id = await AsyncStorage.getItem('fc_id')
            // console.log(fc_id)
            const data = JSON.stringify({
                'farmer_id': farmerId,
                'fc_id': fc_id,
                'qty': qty,
                'mode': "cash"
            })
            const token = await AsyncStorage.getItem('token')
            const res = await axios.post('http://printrly.com/public/api/fcenter/order/create', data, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                }
            })
            console.log(res.data.message.split(' ')[0])
            if (res.data.message.split(' ')[0] == 'success') {
                setMsg(res.data.data.sc_number)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const fetchApiUpdate = async () => {
        try {
            const data = JSON.stringify({
                "name": nameFarmer,
                "phone": phone ? phone : item.phone,
                "ac_number": acNum ? acNum : item.bank.ac_number,
                "ac_ifsc": ifsc ? ifsc : item.bank.ac_ifsc
            })
            console.log(data)
            const token = await AsyncStorage.getItem('token')
            const res = await axios.put(`http://printrly.com/public/api/fcenter/farmer/edit/${farmerId}`, data, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                }
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            {
                modalVisible === 1
                    ?
                    <ImageBackground
                        style={{ flex: 1 }}
                        source={require('../assets/Farmer-list-blur.png')}
                    >
                        <Modal
                            animationType="slide"
                            transparent={true}
                            onRequestClose={() => {
                                setModalVisible(0);
                                setBG(0)
                            }}
                        >
                            <ScrollView
                                keyboardShouldPersistTaps="always"
                                nestedScrollEnabled={true}
                            >
                                <View styles={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ height: height / 6 }}>
                                    </View>
                                    <View style={[styles.centeredView, { flex: 1 }]}>
                                        <Text style={[{ color: '#000', alignSelf: 'center', padding: 30, fontWeight: 'bold', fontSize: 23 }]}>Profile</Text>
                                        <View style={{ flexDirection: 'column' }}>
                                            <CustomModalInput value={nameFarmer} onChangeText={setNameFarmer} Title='Name' />
                                            <CustomModalInput value={phone} onChangeText={setPhone} Title='Phone Number' />
                                            <CustomModalInput value={acNum} onChangeText={setAcNum} Title='Account Number' />
                                            <CustomModalInput value={ifsc} onChangeText={setIfsc} Title='IFSC Code' />
                                        </View>
                                        <View style={{ paddingBottom: 40 }}>
                                            <TouchableOpacity
                                                style={[styles.buttonModal]}
                                                onPress={() => {
                                                    // console.log(nameFarmer)
                                                    // console.log(phone)
                                                    // console.log(acNum)
                                                    // console.log(ifsc)
                                                    fetchApiUpdate()
                                                    setModalVisible(!modalVisible)
                                                    setBG(0)
                                                }}
                                            >
                                                <Text>Update</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </Modal>
                    </ImageBackground>
                    :
                    modalVisible === 2
                        ?
                        <ImageBackground
                            style={{ flex: 1 }}
                            source={require('../assets/Farmer-list-blur.png')}
                        >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                onRequestClose={() => {
                                    setModalVisible(0);
                                    setBG(0)
                                    setMsg('')
                                }}
                            >
                                <ScrollView
                                    keyboardShouldPersistTaps="always"
                                    nestedScrollEnabled={true}
                                >
                                    <View styles={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ height: height / 6 }}>
                                        </View>
                                        <View style={[styles.centeredView, { flex: 1 }]}>
                                            <Text style={[{ color: '#000', alignSelf: 'center', padding: 30, fontSize: 20 }]}>Submit Your Details</Text>
                                            <Image
                                                source={require('../assets/imageedit_3_2963121287.png')}
                                                style={{ height: 130, width: 130, alignSelf: 'center', borderColor: 'grey', borderWidth: 0.4, borderRadius: 100 }}
                                            />
                                            <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                                <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                                                    <TextInput
                                                        placeholder='Quantity'
                                                        value={qty}
                                                        onChangeText={setQty}
                                                        placeholderTextColor={'#fff'}
                                                        style={{ borderBottomWidth: 1, borderColor: '#000', width: 70 }}
                                                    />
                                                    <Text style={{ color: '#000', fontSize: 20, fontWeight: '600' }}>
                                                        Ltr
                                                    </Text>
                                                </View>
                                                <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                                                    <TextInput
                                                        placeholder='Amount'
                                                        placeholderTextColor="#fff"
                                                        style={{ borderBottomWidth: 1, borderColor: '#000', width: 70 }}
                                                    />
                                                    <Text style={{ color: '#000', fontSize: 20, fontWeight: '600' }}>
                                                        Rupees
                                                    </Text>
                                                </View>
                                                <View style={{ flexDirection: 'column' }}>
                                                </View>
                                            </View>
                                            <View style={{ paddingBottom: msg ? 10 : 40 }}>
                                                <TouchableOpacity
                                                    style={[styles.buttonModal]}
                                                    onPress={() => {
                                                        console.log(qty)
                                                        fetchApi()
                                                        setQty('')
                                                    }}
                                                >
                                                    <Text style={{ color: '#fff' }}>Generate SC</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {
                                                msg
                                                    ?
                                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: 'green' }}>Order Placed Successfully </Text>
                                                        <Text style={{ color: 'green' }}>SC Number : {msg}</Text>
                                                    </View>
                                                    :
                                                    null
                                            }
                                        </View>
                                    </View>
                                </ScrollView>
                            </Modal>
                        </ImageBackground>
                        :
                        <View style={{ borderBottomWidth: 1, borderRightWidth: 0.2, borderLeftWidth: 0.2, borderColor: 'grey', height: 80, width: width - 20, alignSelf: 'center', marginBottom: 40 }}>
                            <View style={{ height: '100%', flexDirection: 'row' }}>
                                <View style={{ height: '100%', width: '55%', flexDirection: 'column' }}>
                                    <View style={{ height: '100%' }}>
                                        <Text style={{ color: '#000', paddingLeft: 5, fontSize: 15 }}>
                                            Farmer ID : {farmerId}
                                        </Text>
                                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                            <Text style={{ color: '#000', paddingLeft: 10, alignSelf: 'center' }}>
                                                Name
                                            </Text>
                                            <Text style={{ color: '#000', paddingLeft: 90 }}>
                                                City
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                                            <Text style={{ color: 'rgba(254,138,53,255)', paddingLeft: 10, fontSize: 16 }}>
                                                {name}
                                            </Text>
                                            <Text style={{ color: 'rgba(254,138,53,255)', paddingLeft: 70, fontSize: 16 }}>
                                                {city}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ height: '100%', width: '45%', flexDirection: 'column' }}>
                                    <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 20 }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setModalVisible(2)
                                                setBG(2)
                                            }}
                                        >
                                            <View style={{
                                                height: 25,
                                                width: 100,
                                                borderRadius: 20,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: 'rgba(254,138,53,255)',
                                            }}>
                                                <Text>Add New Order</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ paddingLeft: 20 }}
                                            onPress={() => {
                                                setModalVisible(1)
                                                setBG(1)
                                            }}
                                        >
                                            <Image
                                                source={require('../assets/Farmer-list-removebg-preview.png')}
                                                style={{ height: 30, width: 30 }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 63,
        borderWidth: 3,
        borderColor: "white",
        // marginBottom: 10,
        position: 'relative',
        // marginTop: 30,
        marginLeft: 10
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        }
    },
    profile: {
        marginLeft: 80,
    },
    feed: {
        marginLeft: 20,
        marginTop: 10,
    },
    outer: {
        backgroundColor: '#FF9A17',
        flexDirection: 'row',
        borderRadius: 40,
        height: 45,
        width: width - 90,
        marginBottom: 20,
        alignSelf: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
        // position: 'relative'
    },
    inner: {
        backgroundColor: '#190033',
        borderRadius: 40,
        width: '30%',
        // marginRight: width - 270,
        // alignItems: 'flex-start'
    },
    button: {
        height: 35,
        width: width - 90,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 40,
        backgroundColor: '#FF9A17'
    },
    buttonModal: {
        height: 35,
        width: '60%',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 40,
        backgroundColor: '#FF9A17'
    },
    submit: {
        height: 45,
        width: width - 50,
        marginTop: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 15,
        backgroundColor: '#FF4500'
    },
    centeredView: {
        height: '60%',
        width: '80%',
        alignSelf: 'center',
        marginTop: 22,
        borderWidth: 0,
        borderColor: '#000',
        backgroundColor: 'rgba(242,210,125,255)',
        borderRadius: 25
    },
    input: {
        height: 40,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
    }
})




export default CustomFarmerList