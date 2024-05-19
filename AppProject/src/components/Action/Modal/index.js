import * as React from 'react'
import { styles } from './style'
import { Text, View, TouchableOpacity, Modal } from 'react-native'; // Adicionei Modal e Button


export function ModalAct({ message, visible, close }) {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={close}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{message}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={close}>
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}