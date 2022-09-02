import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get('window')

const CustomProfileLabels = ({ title, navigation }) => {

    // console.log(screen)
    return (
        <TouchableOpacity
            onPress={() =>
                title === "Farmer's List"
                    ?
                    navigation.navigate('FarmerList')
                    :
                    navigation.navigate('Requests')
            }
        >
            <View style={styles.outer}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    outer: {
        backgroundColor: '#FF9A17',
        flexDirection: 'row',
        borderRadius: 40,
        height: 45,
        width: width - 90,
        marginBottom: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'relative'
    },
})



export default CustomProfileLabels