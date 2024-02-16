import React, { createContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import api from '../../../api';

export const UserContext = createContext({})

function UserProvider({ children }) {
    const [user, setUser] = useState([])
    const navigation = useNavigation()

    async function userData(userEmail) {
        try {
            const res = await api.get(`/user/un/${userEmail}`)
            setUser(res.data.user[0])
            navigation.navigate('Tabs')
        } catch (error) {
            alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
        }
    }

    return (
        <UserContext.Provider value={{ userData, user }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;