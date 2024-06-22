import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#06c244',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: 80,
        height: 75,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: {
        fontSize: RFValue(20),
        color: '#06c244', // verde "médio"
        fontFamily: "sans-serif-condensed",
        margin: 10,
    },
});