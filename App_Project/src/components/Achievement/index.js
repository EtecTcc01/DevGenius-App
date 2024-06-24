import * as React from 'react'
import { styles } from './style';
import { View, Text } from 'react-native';

import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕES
import { FontAwesome5 } from '@expo/vector-icons'; //IMPORT DE ICONS DO EXPO
import { getChangedState, storeChangedState } from '../../functions/async.services';
import { getAllUserAchievements, userAchievementRegister } from '../../functions/helper.services';


export function Achievement({ visible }) {

    return (
        <>
            {visible === true && (
                <Animatable.View animation="bounceInLeft" duration={1000} style={styles.container}>
                    <FontAwesome5 style={{ marginRight: 10 }}
                        name="award"
                        size={48}
                        color="black"
                    />
                </Animatable.View>
            )}
        </>
    );
}