import * as React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';
import { styles } from './style';

export function ListNotes({ courses, notes, handlerOnPress }) {
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    const listNote = !courses && !notes ? [] : courses.map((e, i) => {
        return (
            <List.Accordion key={i} title={e._course} left={props => <List.Icon {...props} icon="book" />}>
                {notes.map((element, index) => {
                    return (
                        <TouchableOpacity style={{ backgroundColor: "white" }} key={index} onPress={() => handlerOnPress(element)}>
                            {
                                e.id_course === element.id_course && (
                                    <List.Item title={element._teory} style={styles.item} titleStyle={styles.item_title} />
                                )
                            }
                        </TouchableOpacity>
                    )
                })}
            </List.Accordion>
        )
    })

    return (
        <ScrollView style={styles.container}>
            <List.Section style={{ width: '96%', alignSelf: "center" }}>
                {listNote ? listNote : <></>}
            </List.Section>
        </ScrollView>
    );
};