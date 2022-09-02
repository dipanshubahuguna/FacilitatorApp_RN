import React, {createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginContext = createContext()

const LoginProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const fetchUser = async () => {
        console.log("reached provider !!")
        try {
            const token = await AsyncStorage.getItem('token')
            console.log("token in loginProvider --",token)
            const res = await axios.get('http://printrly.com/public/api/user',{
                headers:{
                    authorization : `Bearer ${token}`
                }
            })
            console.log(res.data.id)
            if(res.data){
                await AsyncStorage.setItem('fc_id',res.data.id.toString())
            }
            // const fc_id = await AsyncStorage.getItem('fc_id')
            // console.log("fetched form token fc_id",fc_id)
            // const token = true
            token ? setIsLoggedIn(true) : setIsLoggedIn(false)
            console.log('isLoggedIn --', isLoggedIn)

            // if (token) {
            // }else{
            //     setIsLoggedIn(false)
            // }
        } catch (error) {
            console.log("error --",error)
        }
    }
    useEffect(() =>{
        fetchUser()
    },[])
    return (
        <LoginContext.Provider value={{setIsLoggedIn , isLoggedIn}}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => useContext(LoginContext)

export default LoginProvider