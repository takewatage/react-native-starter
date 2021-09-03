import React, {useEffect} from "react";
import {Text, View, StyleSheet} from "react-native";
import {Button, Icon, Image} from "react-native-elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import {IMainDate, updateMain} from '../../store/modules/mainDate'
import dayjs from 'dayjs'
import {RootState} from "../../store";
import Ani from "../../models/ani";

export const FirstScreen = () => {
    const safeArea = useSafeAreaInsets()
    const dispatch = useDispatch()
    const {mainDate} = useSelector<RootState, {mainDate: Ani}>((state:RootState) => state.mainDate)

    const onTest = () => {
        console.log("test")
        dispatch(updateMain({
            title: '付き合って',
            date: dayjs().format('YYYY-MM-DD')
        }))
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'transparent' , justifyContent: 'center', height:'100%'}} >
            <View style={[{flexDirection: 'row', justifyContent: 'center'}, styles.position]}>
                <Image style={styles.userImg} source={{uri: 'https://placehold.jp/70x70.png'}}/>
                <Icon size={30} name={'heart'} type={'font-awesome'} color={'#ffffff'}/>
                <Image style={styles.userImg} source={{uri: 'https://placehold.jp/70x70.png'}}/>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[styles.topText, {fontSize: 14, }]}>{mainDate.title}</Text>
                <Text style={[styles.topText, {fontSize: 30, fontWeight: 'bold'}]}>{mainDate.date}</Text>
                <Text style={[styles.topText, {}]}>2020/04/25</Text>
            </View>


            <Button onPress={() => {onTest()}}>
                test
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    topText: {
        color: '#ffffff',
        marginBottom: 10
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
    }
})