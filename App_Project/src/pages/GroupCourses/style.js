import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    title: {
        textAlign: "left",
        fontSize: RFValue(15),
        color: '#06c244',
        fontFamily: 'sans-serif',
        margin: 15
    },
    content: {
        flex: 1, 
        width: "100%"
    },
});