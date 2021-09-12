import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import {Button, Icon, Image} from "react-native-elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import {IMainDate, reset} from '../../store/modules/mainDate'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {RootState} from "../../store";
import Ani from "../../models/ani";
import dayjs from 'dayjs'

export const FirstScreen = () => {
    const safeArea = useSafeAreaInsets()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {mainDate} = useSelector<RootState, {mainDate: IMainDate}>((state:RootState) => state.mainDate)
    const [ani, setAni] = useState(new Ani({}).getPostable() as Ani)

    useEffect(() => {
        setAni(new Ani(mainDate))
    }, [])

    const onReset = () => {
        console.log("onReset")
        dispatch(reset())
    }

    return (
        <>
        {
            ani.id?
                (<View style={{ flex: 1, backgroundColor: 'transparent' , justifyContent: 'center', height:'100%'}} >
                    <View style={[{flexDirection: 'row', justifyContent: 'center'}, styles.position]}>
                        <Image style={styles.userImg} source={{uri: 'https://placehold.jp/70x70.png'}}/>
                        <Icon size={30} name={'heart'} type={'font-awesome'} color={'#ffffff'}/>
                        <Image style={styles.userImg} source={{uri: 'https://placehold.jp/70x70.png'}}/>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={[styles.topText, {fontSize: 18, }]}>{mainDate.title}</Text>
                        <Text style={[styles.topText, {fontSize: 40, fontWeight: 'bold', letterSpacing: 2}]}>{ani.countUntilToday()}</Text>
                        <Text style={[styles.topText, {}]}>{dayjs(ani.date).format('YYYY年MM月DD日')}</Text>
                    </View>


                    <Button title={'rreset'} onPress={() => {onReset()}} />
                </View>)
                :
                (<>
                </>)
        }
        </>
    )
}

const styles = StyleSheet.create({
    topText: {
        color: '#ffffff',
        marginBottom: 10,
        fontSize: 18
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