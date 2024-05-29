import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "space-around"
    },
    title: {
        fontSize: RFValue(13),
        fontWeight: "bold",
        alignSelf: "flex-start"
    },
    subTitle: {
        fontSize: RFValue(8),
        alignSelf: "flex-start"
    },
    cover: {
        minWidth: 100,
        minHeight: 100,
        alignSelf: 'center',
        margin: 5, 
        borderRadius: 15,
    },
    card: {
        width: "40%",
        height: 270,
        margin: 5,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 15,
        maxWidth: 300,
        minWidth: 165
    },
    button: {
        width: "41%",
        height: "auto",
        minWidth: 70
    },
    label: {
        fontSize: RFValue(8)
    },
    action: {
        width: "100%", 
        flexDirection: "row", 
        flexWrap: "wrap", 
        justifyContent: "space-around", 
        alignItems: "center"
    }
});
