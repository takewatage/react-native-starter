import React, {useState} from "react";
import {Text, View, StyleSheet, TextInput, NativeSyntheticEvent, TextInputChangeEventData} from "react-native";
import {Button, Icon, Image, Input} from "react-native-elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Layout from "../../constants/Layout";
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';



export const InitScreen = () => {
    const safeArea = useSafeAreaInsets()
    const [text, setText] = useState('')
    const [date, setDate] = useState(new Date(1598051730000))
    const [show, setShow] = useState(false);

    const onChange = (event:Event, selectedDate:any) => {
        console.log(selectedDate)
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    return (
        <View style={styles.noScreen}>
            <Text style={styles.topText}>
                あなたの記念日を{"\n"}登録してください。
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
            />

            <View>
                {/*<DateTimePicker*/}
                {/*    testID="dateTimePicker"*/}
                {/*    value={date}*/}
                {/*    mode={'date'}*/}
                {/*    is24Hour={true}*/}
                {/*    display="default"*/}
                {/*    onChange={onChange}*/}
                {/*/>*/}
            </View>

            <Button
                activeOpacity={0.8}
                title="決定"
                buttonStyle={{backgroundColor: "pink"}}
                containerStyle={{width: 200, borderRadius: 50}}
                onPress={() => {
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    topText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        lineHeight: 25,
    },

    input: {
        color: '#ffffff',
        fontSize: 20,
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
        marginBottom: 20,
        textAlign: 'center',
        paddingHorizontal: 15,
        paddingBottom: 5,
        minWidth: 100
    },

    position: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 50
    },

    userImg: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginHorizontal: 20
    },

    noScreen: {
        flex: 1,
        width: Layout.window.width,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    }
})