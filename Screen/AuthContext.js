import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [spinner, setSpinner] = useState(false)
    const [token, setToken] = useState(null)
    const [error, setError] = useState('')

    const [login, setLogin] = useState({})

    const [register, setRegister] = useState({})

    const [TOKEN, SETTOKEN] = useState(null)






    const logout = () => {
        setSpinner(false)
        setToken(null)
        AsyncStorage.removeItem('token')
        console.log('Logout');
    }
    
    const loginFunc = async () => {
        setSpinner(true)
        await axios.post('http://192.168.1.59:3001/api/login', login)
            .then(async (res) => {
                setError(res.data.message)
                if (res.data.message) {
                    setSpinner(false)
                }
                if (res.data.success) {
                    let authToken = (res.data.authToken);
                    await AsyncStorage.setItem('token', JSON.stringify(authToken))

                    setToken(authToken)
                    setSpinner(false)
                    setError('')
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }

    async function CheckToken() {
        const storedToken = await AsyncStorage.getItem('token')
        SETTOKEN(storedToken)
    }


    const IsLoggedIn = async () => {
        try {
            let userToken = await AsyncStorage.getItem('token')
            console.log(userToken, 'USERTOKEN in Logged in ');

            setIsLoading(false)
            setToken(userToken)
        }
        catch (e) {
            console.log(`IsLogged is an Error${e}`);
        }
    }


    useEffect(() => {
        IsLoggedIn()
    }, [])

    return (
        <>
            <AuthContext.Provider value={{ isLoading, logout, loginFunc, CheckToken, TOKEN, spinner, token, setError, error, setLogin, login, register, setRegister }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

