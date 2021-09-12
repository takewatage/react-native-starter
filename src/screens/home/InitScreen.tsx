import React, {useState} from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    TouchableOpacity, ActivityIndicator
} from "react-native";
import {Button, Icon, Image, Input, Overlay} from "react-native-elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Layout from "../../constants/Layout";
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import dayjs from 'dayjs'
import PageLoading from "../../components/pageLoading";
import {updateMain} from '../../store/modules/mainDate'
import {useDispatch, useSelector} from "react-redux";
import Ani from "../../models/ani";





export const InitScreen = () => {
    const [load, setLoad] = useState(false)
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()

    const onChange = (event:Event, selectedDate:any) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate)
    };

    const onOK = async () => {
        setLoad(true)
        setTimeout(() => {
            // dispatch(updateMain(new Ani({
            //     id: 'firstDate',
            //     title: '記念日',
            //     date: dayjs(date).format("YYYY-MM-DD")
            // })))
            dispatch(updateMain({
                id: 'firstDate',
                title: '記念日',
                date: dayjs(date).format("YYYY-MM-DD")
            }))
            setLoad(false)
        }, 1000)
    }


    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View style={styles.noScreen}>
            <Text style={styles.topText}>
                あなたの記念日を{"\n"}登録してください。
            </Text>

            <TouchableOpacity activeOpacity={0.8} onPress={() => showDatepicker()}>
                <View style={styles.calenderInput}>
                    <Icon name={'calendar'} type={'feather'} color={"#fff"} style={{marginRight:5}}/>
                    <Text style={{color:"#fff", fontSize: 18}}>{dayjs(date).format("YYYY年 MM月 DD日")}</Text>
                </View>
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            <Button
                activeOpacity={0.8}
                title="決定"
                buttonStyle={{backgroundColor: "pink"}}
                containerStyle={{width: 200, borderRadius: 50}}
                disabled={!date}
                onPress={() => onOK()}
            />

            <Overlay
                isVisible={load}
                overlayStyle={{backgroundColor: 'transparent'}}
                style={{ flex:1}}>

                <ActivityIndicator
                    color="pink"
                    style={{backgroundColor: "transparent"}}
                    size={'large'}
                    animating={true} />
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    topText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        lineHeight: 25,
    },

    noScreen: {
        flex: 1,
        width: Layout.window.width,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },

    calenderInput: {
        flexDirection:"row",
        alignItems:"center",
        borderWidth: 1,
        borderRadius: 7,
        borderColor:"#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 30
    }
})