import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, TextInput, ImageBackground, Image, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native'
import { signOut } from '../api/user';
import CustomHeader from '../components/CustomHeader';
import CustomModalInput from '../components/CustomModalInput';
import CustomProfileLabels from '../components/CustomProfileLabel';
import FarmerList from './FarmerList';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useLogin } from '../context/LoginProvider';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterLottie from './Lottie/RegisterLottie';
const { height, width } = Dimensions.get('window')

const HomeScreen = ({ navigation }) => {

    const [docImage, setDocImage] = useState({})
    const [profileImage, setProfileImage] = useState({})

    const [modalVisible, setModalVisible] = useState(false);
    const [drop, setDrop] = useState(false)
    const [selected, setSelected] = useState('')
    const [successDoc, setSuccessDoc] = useState(null)
    const [successImg, setSuccessImg] = useState(null)
    const [showUploadButton, setShowUploadButton] = useState(false)
    const [errorXX, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        bankName: '',
        acHolder: '',
        ifsc: '',
        acNum: ''
    })

    const { name, phone, email, password, bankName, acHolder, ifsc, acNum } = userInfo

    const handelOnChangeText = (value, fieldName) => {
        setUserInfo({ ...userInfo, [fieldName]: value })
        // console.log(userInfo.email)
    }


    const clickDoc = async () => {
        try {
            var resultDoc = await launchCamera({
                mediaType: 'photo',
                quality: 1,
                includeBase64: false,
            });
            // console.log("resultDoc ---",resultDoc)
            let DOC = resultDoc.assets[0];
            // console.log(DOC)

            let dataDOC = new FormData();
            dataDOC.append('document', {
                uri: DOC.uri,
                type: DOC.type,
                name: DOC.fileName,
            });
            // data.append('farmer_id', farmer_id);
            // data.append('doc_type', checked);

            // console.log('form data', dataDOC);
            setDocImage(() => {
                return dataDOC
            })

            if (docImage) {
                setSuccessDoc('Document Selected!')
            }
            // console.log("docImage._parts ========= ", docImage._parts[0][1])

        } catch (error) {
            console.log(error)
        }
    }

    const checkEmpty = (userInfo) => {
        console.log(userInfo)
        if (!userInfo) return false

        if (userInfo.name == '' || userInfo.phone == '' || userInfo.email == '' || userInfo.password == '' || userInfo.bankName == '' || userInfo.acHolder == '' || userInfo.acNum == '' || userInfo.ifsc == '' || !docImage) {
            console.log(false)
            return false
        } else {
            console.log(true)
            return true
        }
    }

    const clickImage = async () => {
        try {
            const fc_id = await AsyncStorage.getItem('fc_id')
            console.log(fc_id)
            var resultImage = await launchCamera({
                mediaType: 'photo',
                quality: 1,
                includeBase64: false,
            });
            // console.log("resultImage ---",resultImage)
            let IMG = resultImage.assets[0]
            // console.log(IMG)

            let dataIMG = new FormData();
            dataIMG.append('photo', {
                uri: IMG.uri,
                type: IMG.type,
                name: IMG.fileName,
            });
            dataIMG.append('name', userInfo.name);
            dataIMG.append('phone', userInfo.phone);
            dataIMG.append('email', userInfo.email);
            dataIMG.append('lang', 'en');
            dataIMG.append('password', userInfo.password);
            dataIMG.append('added_by', fc_id);
            dataIMG.append('status', '1');
            dataIMG.append('doc_type', selected);
            dataIMG.append('bank_name', userInfo.bankName);
            dataIMG.append('ac_number', userInfo.acNum);
            dataIMG.append('ac_holder', userInfo.acHolder);
            dataIMG.append('ac_ifsc', userInfo.ifsc);
            dataIMG.append('document', docImage._parts[0][1]);

            // console.log('form data', dataIMG);
            setProfileImage(() => {
                return dataIMG
            })

            if (profileImage) {
                setSuccessImg('Image Selected!')
            }
            // console.log(profileImage)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchApi = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await fetch('http://printrly.com/public/api/fcenter/farmer/create', {
                method: 'POST',
                body: profileImage,
                Headers: {
                    authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            })
            let resp = await res.json()
            console.log(resp)
            if (resp.message == 'failed') {
                // setError(() => 'Phone/Email/Account number already exists')
                // console.log("errorXX", errorXX)
                return false
            }
            return true
        } catch (error) {
            // if (error == 'duplicate entry error') {
            //     setError(() => 'Phone/Email/Account number already exists')
            // }
            // console.log(error)
            return false
        }
    }


    const createFarmer = async () => {
        // console.log('waiting')
        setLoading(true)
        console.log("loading", loading)
        const res = await fetchApi()
        setLoading(false)
        console.log("loading", loading)
        if (res) {
            setModalVisible(!modalVisible)
            setUserInfo({
                name: '',
                phone: '',
                email: '',
                password: '',
                bankName: '',
                acHolder: '',
                ifsc: '',
                acNum: ''
            })
            setSelected('')
            setDocImage({})
            setProfileImage({})
            setSuccessDoc(null)
            setSuccessImg(null)
            setShowUploadButton(false)
        } else {
            Alert.alert('Phone or Email already exists')
        }
    }
    const { setIsLoggedIn } = useLogin()
    return (
        <ImageBackground
            source={modalVisible ? require('../assets/blur_background1.png') : require('../assets/Background.png')}
            resizeMode="cover"
            style={{ flex: 1 }}
        >
            {
                modalVisible
                    ?
                    <Modal
                        animationType="slide"
                        transparent={true}
                        // visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                            setSelected('')
                            setUserInfo({
                                name: '',
                                phone: '',
                                email: '',
                                password: '',
                                bankName: '',
                                acHolder: '',
                                ifsc: '',
                                acNum: ''
                            })
                            setDocImage({})
                            setProfileImage({})
                            setSuccessDoc(null)
                            setSuccessImg(null)
                            setShowUploadButton(false)
                        }}
                    >
                        <ScrollView keyboardShouldPersistTaps="always" nestedScrollEnabled={true}>
                            <View styles={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ height: height / 6 }}>
                                </View>
                                <View style={[styles.centeredView, { flex: 1 }]}>
                                    <Text style={[{ color: '#000', alignSelf: 'center', paddingTop: 30, fontWeight: 'bold', fontSize: 23 }]}>Profile</Text>
                                    <Text style={[{ color: 'grey', alignSelf: 'center', padding: 10, fontSize: 10 }]}>Scroll Down to complete full profile</Text>
                                    {
                                        loading
                                            ?
                                            <View style={{alignItems:'center'}}>
                                                <Text style={{color:'#fff',fontSize:10}}>
                                                    Creating Farmer Please Wait....
                                                </Text>
                                                <RegisterLottie/>
                                            </View>
                                            :
                                            null
                                    }
                                    <View style={{ height: height / 3, flexDirection: 'column' }}>
                                        <ScrollView keyboardShouldPersistTaps="always" nestedScrollEnabled={true} >
                                            <CustomModalInput Title='Name' value={name} onChangeText={(value) => handelOnChangeText(value, 'name')} />
                                            <CustomModalInput Title='Phone Number' value={phone} onChangeText={(value) => handelOnChangeText(value, 'phone')} />
                                            <CustomModalInput Title='Email' value={email} onChangeText={(value) => handelOnChangeText(value, 'email')} />
                                            <CustomModalInput Title='Password' value={password} onChangeText={(value) => handelOnChangeText(value, 'password')} />
                                            <View style={{ flexDirection: 'row', alignSelf: 'center', paddingBottom: 20 }}>
                                                <View style={{ width: '40%' }}>
                                                    <Text style={{ color: '#000' }}>
                                                        Document Type
                                                    </Text>
                                                </View>
                                                <View style={{ width: '40%' }}>
                                                    <TouchableOpacity onPress={() => { setDrop(!drop) }}>
                                                        <View style={[styles.input]}>
                                                            {
                                                                selected == '' ?
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        justifyContent: 'space-between',
                                                                        alignItems: 'center',
                                                                    }}>
                                                                        <Text style={{ color: '#000', fontSize: 10 }}>
                                                                            Select Document Type
                                                                        </Text>
                                                                        <Image
                                                                            source={require('../assets/arrow_drop_down_FILL0_wght400_GRAD0_opsz48.png')}
                                                                            style={{ height: 20, width: 20, transform: [{ rotate: drop ? '180deg' : '0deg' }] }}
                                                                        />
                                                                    </View>
                                                                    :
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        justifyContent: 'space-between',
                                                                        alignItems: 'center',
                                                                    }}>
                                                                        <Text style={{ color: '#000', fontSize: 10 }}>
                                                                            {selected}
                                                                        </Text>
                                                                        <Image source={require('../assets/arrow_drop_down_FILL0_wght400_GRAD0_opsz48.png')}
                                                                            style={{ height: 20, width: 20, transform: [{ rotate: drop ? '180deg' : '0deg' }] }} />
                                                                    </View>
                                                            }
                                                        </View>
                                                    </TouchableOpacity>
                                                    {
                                                        drop
                                                            ? <>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        setSelected('Aadhar')
                                                                        setDrop(!drop)
                                                                    }}
                                                                >
                                                                    <View style={{ alignItems: 'center', backgroundColor: '#D3D3D3', width: '100%', borderBottomWidth: 0.2, borderColor: 'grey' }}>
                                                                        <Text style={{ color: '#000', fontSize: 10 }}>
                                                                            Aadhar Card
                                                                        </Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        setSelected('Voter')
                                                                        setDrop(!drop)
                                                                    }}
                                                                >
                                                                    <View style={{ alignItems: 'center', backgroundColor: '#D3D3D3', width: '100%', borderBottomWidth: 0.2, borderColor: 'grey' }}>
                                                                        <Text style={{ color: '#000', fontSize: 10 }}>
                                                                            Voter ID
                                                                        </Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        setSelected('Ration')
                                                                        setDrop(!drop)
                                                                    }}
                                                                >
                                                                    <View style={{ alignItems: 'center', backgroundColor: '#D3D3D3', width: '100%', height: 20, borderBottomEndRadius: 5, borderBottomStartRadius: 5, borderBottomWidth: 0.2, borderColor: 'grey' }}>
                                                                        <Text style={{ color: '#000', fontSize: 10 }}>
                                                                            Ration Card
                                                                        </Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </>
                                                            :
                                                            null
                                                    }
                                                </View>
                                            </View>
                                            <CustomModalInput Title='Document' successDoc={successDoc} onPress={clickDoc} value={docImage} image={true} />
                                            {
                                                successDoc ?
                                                    <View style={{ paddingBottom: 20, alignSelf: 'flex-end', paddingRight: width / 5 }}>
                                                        <Text style={{ color: '#000', fontSize: 10 }}>
                                                            {successDoc}
                                                        </Text>
                                                    </View>
                                                    :
                                                    <View style={{ paddingBottom: 20, alignSelf: 'flex-end', paddingRight: 20 }}>
                                                    </View>
                                            }
                                            <CustomModalInput Title='Bank Name' value={bankName} onChangeText={(value) => handelOnChangeText(value, 'bankName')} />
                                            <CustomModalInput Title='Account Number' value={acNum} onChangeText={(value) => handelOnChangeText(value, 'acNum')} />
                                            <CustomModalInput Title='Account Holder' value={acHolder} onChangeText={(value) => handelOnChangeText(value, 'acHolder')} />
                                            <CustomModalInput Title='IFSC code' value={ifsc} onChangeText={(value) => handelOnChangeText(value, 'ifsc')} />
                                            {/* {
                                                showUploadButton
                                                    ?
                                                    <CustomModalInput Title='Profile picture' value={profileImage} onPress={clickImage} image={true} />
                                                    :
                                                    null
                                            }
                                            {
                                                successImg ? <>
                                                    <Text>
                                                        {successImg}
                                                    </Text>
                                                </> : null
                                            } */}
                                        </ScrollView>
                                    </View>
                                    <View style={{ paddingBottom: 40 }}>
                                        {
                                            showUploadButton
                                                ?
                                                <CustomModalInput Title='Profile picture' value={profileImage} onPress={clickImage} image={true} />
                                                :
                                                null
                                        }
                                        {
                                            successImg ?
                                                <View style={{ paddingBottom: 20, alignSelf: 'flex-end', paddingRight: width / 5 }}>
                                                    <Text style={{ color: '#000', fontSize: 10 }}>
                                                        {successImg}
                                                    </Text>
                                                </View>
                                                :
                                                <View style={{ paddingBottom: 20, alignSelf: 'flex-end', paddingRight: 20 }}>
                                                </View>
                                        }
                                        <TouchableOpacity
                                            style={[styles.buttonModal]}
                                            onPress={() => {
                                                console.log("userInfo ---", userInfo)
                                                if (checkEmpty(userInfo) == true && successImg == null) {
                                                    setShowUploadButton(true)
                                                    Alert.alert('Upload Profile picture')
                                                } else if (checkEmpty(userInfo) == false && successImg == null) {
                                                    Alert.alert('All Fields Required')
                                                } else if (checkEmpty(userInfo) && successImg != null) {
                                                    createFarmer()
                                                }
                                            }}
                                        >
                                            <Text style={{ color: '#fff' }}>Register Farmer</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </Modal>
                    :
                    <ScrollView keyboardShouldPersistTaps="always" nestedScrollEnabled={true}>
                        {/* <CustomHeader navigation={navigation}/>  */}
                        <CustomHeader profile={true} signout={true} />
                        <View style={{ flexDirection: 'column', marginTop: 100, alignItems: 'center' }}>
                            {/* <Image style={[styles.avatar, { height: 60, width: 60 ,justifyContent:'center',alignItems:'center'}]} source={require('../assets/Dp.png')} /> */}
                            <Text style={{ fontWeight: 'bold', color: '#000000', fontSize: 25 }}>
                                Hey Admin!
                            </Text>
                            <Text style={{ color: 'grey' }}>
                                India
                            </Text>
                            <Image style={{ justifyContent: 'center', alignItems: 'center', height: 20, width: 20 }} source={require('../assets/flag.png')} />
                            <Image style={[{ height: 100, width: 100, justifyContent: 'center', alignItems: 'center' }]} source={require('../assets/Dp.png')} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        </View>
                        <View style={{ paddingTop: 20, flexDirection: 'column' }}>
                            <CustomProfileLabels title="Farmer's List" navigation={navigation} />
                            <CustomProfileLabels title="Approved Request" navigation={navigation} />
                            {/* <CustomProfileLabels title="Add New Farmer" /> */}
                        </View>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                        >
                            <View style={styles.outer}>
                                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                                    Add New Farmer
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={async () => {
                                const isLoggedOut = await signOut()
                                if (isLoggedOut) {
                                    setIsLoggedIn(false)
                                }
                            }}
                        >
                            <View style={styles.outer}>
                                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                                    Signout
                                </Text>
                            </View>
                        </TouchableOpacity> */}
                    </ScrollView>
            }
        </ImageBackground>
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
        alignItems: 'center',
        justifyContent: 'center',
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
        // marginBottom: 10,
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
        height: 30,
        backgroundColor: '#D3D3D3',
        borderRadius: 5,
        padding: 6
    }
})


export default HomeScreen