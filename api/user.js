import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';

export const signIn = async ({email,password}) => {

    try {
        // console.log("email in user.js ---- ",email)
        // console.log("password in user.js ---- ",password)
        const res = await axios.post('http://printrly.com/public/api/fcenter/login', {
            email: email,
            password: password
        })

        // console.log("resp.data", res.data)
        // console.log("resp.data.message", res.data.message)
        // console.log("resp.data.token", res.data.token.toString())
        
        if(!res.data.error){
            if (res.data.message === "Success") {
                const token = res.data.token.toString()
                console.log(token)
                await AsyncStorage.setItem('token',token)
                // const fetchedToken = await AsyncStorage.getItem('token')
                // console.log("fetchedToken ---",fetchedToken)
            }
        }
        return res.data
    } catch (error) {
        console.log(error)
    }
} 

export const signOut = async () =>{
    try {
        const token = await AsyncStorage.getItem('token')
        const res = await axios.post('http://printrly.com/public/api/fcenter/logout',{
            Headers:{
                Authorization : `Bearer ${token}`
            }
        })
        console.log("res in signOut in user.js ----",res.data)
        if(res.data.message === "Success" ){
            AsyncStorage.removeItem('token')
            return true
        }
        return false
    } catch (error) {
        console.log(error)
    }
}