import React, { useRef,useEffect } from 'react';
import { View } from 'react-native';

import LottieView from 'lottie-react-native';

const RupeesLottie = ({navigation}) => {
    
    const animationRef = useRef()

    useEffect(() => {
        animationRef.current?.play();
    }, []);

    setTimeout(() => {
        navigation.replace('Home')
    }, 1500);

    return (
        <View style={{backgroundColor:'#fff',flex:1,alignContent:'center',justifyContent:'center'}}>
            <LottieView
                style={{ height: 200, width: 200, alignSelf: 'center'}}
                source={require('../../assets/lf30_editor_lc8x1mpl.json')}
                ref={(animation) => {
                    animationRef.current = animation;
                }}
                autoPlay
                loop
            />
        </View>
    )
}

export default RupeesLottie