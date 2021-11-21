import React, {useState, createRef} from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    TouchableOpacity, ActivityIndicator, Alert, Platform, ImageBackground
} from "react-native";
import {Button, Icon, Image, Input, Overlay} from "react-native-elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Layout from "../../constants/Layout";
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import dayjs from 'dayjs'
import PageLoading from "../../components/pageLoading";
import {useDispatch, useSelector} from "react-redux";
import Ani from "../../models/ani";
import ActionSheet from "react-native-actions-sheet";
import FirestoreService from "../../services/FirestoreService";
import {RootState} from "../../store";
import Pairs from "../../models/pairs";
import {resetPairCode} from '../../store/modules/pairs'
import {AnniversaryState, resetAnniversary, updatePageLoading, updateCheckLoading, updatePageName, updateAnniversary} from '../../store/modules/anniversary'






export const InitScreen = () => {
    const [load, setLoad] = useState(false)
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);
    const actionRef = React.useRef(null)

    const {pairs, pageLoading} = useSelector<RootState, AnniversaryState>((state:RootState) => state.anniversary)
    const dispatch = useDispatch()

    const onChange = (event:Event, selectedDate:any) => {
        if (Platform.OS == 'android') {
            const currentDate = selectedDate || date;
            setShow(false);
            setDate(currentDate)
            return
        }
        const currentDate = selectedDate || date
        setDate(currentDate)
    };

    const onOK = async () => {

        if(dayjs(date) > dayjs()) {
            Alert.alert('本日より前の日にちを選択してください。')
            return
        }

        dispatch(updatePageLoading(true))

        let _pairs = new Pairs({...pairs}) as Pairs
        let _ani: Ani = new Ani({
            type: 'anniversary',
            date: dayjs(date).format('YYYY-MM-DD'),
            title: '記念日',
            subTitle: ''
        })
        console.log('_pairs', _pairs.anniversaries)
        console.log('_ani', _ani)

        _pairs.anniversaries = [_ani]

        console.log(_pairs)

        try {
            await FirestoreService.createAnniversary(_pairs.id, _pairs)
            dispatch(updateAnniversary(_pairs.getPostable() as Pairs))
            dispatch(updatePageLoading(false))
            dispatch(updateCheckLoading(true))
            setTimeout(() => {
                dispatch(updateCheckLoading(false))
                dispatch(updatePageName('main'))
            }, 3000)
        }
        catch (e) {
            Alert.alert("データベースエラー", "", [{onPress: () => {
                    dispatch(updatePageLoading(false))
            }}])
        }


        // setTimeout(() => {
        //     dispatch(createAnniversary({
        //         id: 'firstDate',
        //         title: '記念日',
        //         date: dayjs(date).format("YYYY-MM-DD")
        //     }))
        //     setLoad(false)
        // }, 1000)
    }


    const showDatepicker = () => {
        if(Platform.OS=='ios') {
            // @ts-ignore
            actionRef.current?.setModalVisible()
        } else {
            setShow(true);
        }
    };

    return (
        <View style={[styles.container]}>
            <ImageBackground style={{width: '100%', height: '100%'}} resizeMode="cover"
                             source={require('../../../assets/images/bg/bg.jpeg')}>

                <View style={styles.noScreen}>
                    <Button title={'delete'} onPress={() => {
                        dispatch(resetPairCode())
                        dispatch(resetAnniversary())
                    }}/>

                    <Text style={styles.topText}>
                        ふたりの記念日を{"\n"}登録してください
                    </Text>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => showDatepicker()}>
                        <View style={styles.calenderInput}>
                            <Icon name={'calendar'} type={'feather'} color={"#fff"} style={{marginRight:5}}/>
                            <Text style={{color:"#fff", fontSize: 18}}>{dayjs(date).format("YYYY年 MM月 DD日")}</Text>
                        </View>
                    </TouchableOpacity>

                    {show &&
                    <DateTimePicker
                        style={{width: Layout.window.width}}
                        value={date}
                        is24Hour={true}
                        locale="ja"
                        display={Platform.OS == 'ios' ? 'spinner' : 'default'}
                        minuteInterval={10}
                        onTouchCancel={() => {
                            console.log("cancel")
                        }}
                        onChange={onChange}
                        onAccessibilityAction={() => {
                            console.log("cancel!!!!")
                        }}
                    />
                    }

                    <Button
                        activeOpacity={0.8}
                        title="決定"
                        buttonStyle={{backgroundColor: "pink"}}
                        containerStyle={{width: 200, borderRadius: 50}}
                        disabled={!date}
                        onPress={() => onOK()}
                    />

                    <ActionSheet
                        ref={actionRef}
                        gestureEnabled
                        delayActionSheetDraw={true}
                    >
                        <DateTimePicker
                            style={{width: Layout.window.width}}
                            value={date}
                            textColor={'#000'}
                            is24Hour={true}
                            locale="ja"
                            display={Platform.OS == 'ios' ? 'spinner' : 'default'}
                            minuteInterval={10}
                            onTouchCancel={() => {
                                console.log("cancel")
                            }}
                            onChange={onChange}
                            onAccessibilityAction={() => {
                                console.log("cancel!!!!")
                            }}
                        />
                    </ActionSheet>

                    {/*<View>*/}
                    {/*    <Overlay*/}
                    {/*        isVisible={loading}*/}
                    {/*        overlayStyle={{elevation: 0,backgroundColor: 'transparent'}}*/}
                    {/*        style={{ flex:1, width: '100%'}}>*/}

                    {/*        <LottieView style={{width: 100, opacity: 0.7}} source={require('../../assets/lottie/pink-loading.json')} autoPlay loop />*/}
                    {/*    </Overlay>*/}
                    {/*    <Overlay*/}
                    {/*        isVisible={completeLoading}*/}
                    {/*        overlayStyle={{elevation: 0,backgroundColor: 'transparent'}}*/}
                    {/*        style={{ flex:1, width: '100%'}}>*/}

                    {/*        <LottieView style={{width: 100,}} source={require('../../assets/lottie/check-mark-confirm-circle-with-pop.json')} autoPlay />*/}
                    {/*    </Overlay>*/}
                    {/*</View>*/}
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center'
    },

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