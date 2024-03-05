import { Text, View } from 'react-native';
import { styles } from './style';
import { UserContext } from '../../apis/contexts/user'
import * as React from 'react'

export function GuestCard() {
    const { user } = React.useContext(UserContext)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil de {user.user_name}</Text>
        </View>
    );
}