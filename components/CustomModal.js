import React, { useState } from 'react';
import { View,Text,TouchableOpacity,Image,ImageBackground } from 'react-native';
import CustomModalInput from './CustomModalInput';

const CUstomModal = () =>{
    return(
        <ImageBackground
                        style={{ flex: 1 }}
                        source={require('../assets/Farmer-list-blur.png')}
                    >
                        <Modal
                            animationType="slide"
                            transparent={true}
                            // visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(0);
                            }}
                        >
                            <ScrollView>
                                <View styles={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ height: height / 6 }}>
                                    </View>
                                    <View style={[styles.centeredView, { flex: 1 }]}>
                                        <Text style={[{ color: '#000', alignSelf: 'center', padding: 30, fontWeight: 'bold', fontSize: 23 }]}>Profile</Text>
                                        <View style={{ flexDirection: 'column' }}>
                                            <CustomModalInput value='Name' />
                                            <CustomModalInput value='Phone Number' />
                                            <CustomModalInput value='Aadhar Number' />
                                            <CustomModalInput value='Bank A/C' />
                                            <CustomModalInput value='IFSC Code' />
                                        </View>
                                        <View style={{ paddingBottom: 40 }}>
                                            <TouchableOpacity
                                                style={[styles.buttonModal]}
                                                onPress={() => setModalVisible(!modalVisible)}
                                            >
                                                <Text>Update</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </Modal>
                    </ImageBackground>
    )
}

export default CUstomModal