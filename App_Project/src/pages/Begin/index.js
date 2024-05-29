import * as React from 'react'
import { styles } from './style'
import { View } from 'react-native';

import { SignIn } from '../../components/Forms/SignIn';
import { Logon } from '../../components/Forms/Logon';
import { Info } from '../../components/Forms/Info';

import ToastManager, { Toast } from 'toastify-react-native'

export function Begin({ route, navigation }) {

    const [operation, setOperation] = React.useState("")
    const [data, setData] = React.useState({})

    React.useEffect(() => {
        setOperation(route.params.operation)

        if (route.params.user) {
            setData(route.params.user)
        }
    }, [route.params])

    const showToasts = (op, message) => {
        Toast[op](message, "top")
    }

    switch (operation) {
        case "Register":
            return (
                <View style={styles.container}>
                    <ToastManager />
                    <View style={styles.content}>
                        <SignIn handlerOnPress={(op, message) => showToasts(op, message)} />
                    </View>
                </View>
            )
        case "Login":
            return (
                <View style={styles.container}>
                    <ToastManager />
                    <View style={styles.content}>
                        <Logon handlerOnPress={(op, message) => showToasts(op, message)}/>
                    </View>
                </View>
            )
        case "Info":
            return (
                <View style={styles.container}>
                    <ToastManager />
                    <View style={styles.content}>
                        <Info data={data} handlerOnPress={(op, message) => showToasts(op, message)}/>
                    </View>
                </View>
            )
        default:
            return <View style={styles.container} />
    }
}
