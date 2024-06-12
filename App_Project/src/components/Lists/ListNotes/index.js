import * as React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';
import { styles } from './style';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS

export function ListNotes({ courses, notes, handlerOnPress }) {

    const listNote = !courses && !notes ? [] : courses.map((e, i) => {
        return (
            <Animatable.View style={styles.card} key={i} delay={100} animation="zoomIn" duration={350 * i + 1}>
                <List.Accordion style={{ backgroundColor: "#88b257" }} title={e._course} left={props => <List.Icon {...props} icon="book" />}>
                    {notes.map((element, index) => {
                        return (
                            <TouchableOpacity style={{ backgroundColor: "#88b257" }} key={index} onPress={() => handlerOnPress(element)}>
                                {
                                    e.id_course === element.id_course && (
                                        <List.Item title={element._teory} style={styles.item} titleStyle={styles.item_title} />
                                    )
                                }
                            </TouchableOpacity>
                        )
                    })}
                </List.Accordion>
            </Animatable.View>
        )
    })

    return (
        <ScrollView style={styles.container}>
            {listNote ? listNote : <></>}
            {/* <View style={{ width: '96%', alignSelf: "center", flex: 1, width: "100%" }}>
                {listNote ? listNote : <></>}
            </View> */}
        </ScrollView>
    );
};