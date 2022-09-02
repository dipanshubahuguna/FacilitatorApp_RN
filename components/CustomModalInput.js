import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



const CustomModalInput = (props) => {

    const pickImage = async () => {
        var results = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
        });
    }

    const clickImage = async () => {
        var results = await launchCamera({
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
        });
    }

    const { image, Title } = props

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: image ? 0 : 20 }}>
            <View style={{ width: '40%' }}>
                <Text style={{ color: '#000' }}>
                    {Title}
                </Text>
            </View>
            {
                image
                    ?
                    <TouchableOpacity
                        {...props}
                        // onPress={() => {
                        //     clickImage()
                        // }}
                        style={{
                            width: '40%', height: 30,
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 6
                        }}>
                        <Text style={{ color: 'grey', fontSize: 10 }}>
                            Attach document
                        </Text>
                        <Image
                            source={require('../assets/attachment_FILL0_wght400_GRAD0_opsz48.png')}
                            style={{
                                height: 20, width: 20,
                            }} />
                    </TouchableOpacity>
                    :
                    <View style={{ width: '40%' }}>
                        <TextInput
                            {...props}
                            style={styles.input} />
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        backgroundColor: '#fff',
        fontSize: 10,
        borderRadius: 5,
        color: '#000'
    }
})

export default CustomModalInput