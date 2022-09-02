import React, { useRef,useEffect } from 'react';
import { View } from 'react-native';

import LottieView from 'lottie-react-native';

const RegisterLottie = ({navigation}) => {
    
    const animationRef = useRef()

    useEffect(() => {
        animationRef.current?.play();
    }, []);

    return (
        <View style={{backgroundColor:'rgba(242,210,125,255)',alignContent:'center',justifyContent:'center',paddingBottom:0}}>
            <LottieView
                style={{ height: 50, width: 80, alignSelf: 'center'}}
                source={require('../../assets/lf30_editor_8wl4qveu.json')}
                ref={(animation) => {
                    animationRef.current = animation;
                }}
                autoPlay
                loop
            />
        </View>
    )
}

export default RegisterLottie