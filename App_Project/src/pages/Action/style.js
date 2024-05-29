import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: '#000', // Verde escuro
        paddingTop: 40,
        justifyContent: 'center',
        // alignItems: "center"
    },
    title: {
        fontSize: RFValue(20),
        color: '#06c244'
    },
    content: {
        flex: 1,
        alignSelf: "center",
        width: "100%",
        flexDirection: 'row',
        justifyContent: "center"

    }
});