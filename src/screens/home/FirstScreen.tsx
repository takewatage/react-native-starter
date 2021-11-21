import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import {Button, Icon, Image} from "react-native-elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {RootState} from "../../store";
import Ani from "../../models/ani";
import dayjs from 'dayjs'
import Ripple from "react-native-material-ripple";
import FirestoreService from "../../services/FirestoreService";
import Pairs from "../../models/pairs";
import linq from "linq";

export const FirstScreen = () => {
    const {pairs} = useSelector<RootState, {pairs: Pairs}>((state:RootState) => state.anniversary)
    const [pairsData, setPairs] = useState(new Pairs({...pairs}))

    useEffect(() => {
        setPairs(new Pairs({...pairs}))
        console.log('pairs', pairs)
        console.log('pairsData', pairsData)
        return () => {
            setPairs(new Pairs({}))
        }
    }, [pairs])


    return (
        <>
        {
            pairs.id?
                (<View style={{ flex: 1, backgroundColor: 'transparent' , justifyContent: 'center', height:'100%'}} >
                    <View style={[{flexDirection: 'row', justifyContent: 'center'}, styles.position]}>
                        <View style={styles.imgBox}>
                            <Image style={styles.userImg} source={{uri: 'https://placehold.jp/70x70.png'}}/>
                            <Text style={styles.nameText}>あみ</Text>
                        </View>
                        <Icon size={30} name={'heart'} type={'font-awesome'} color={'#ffffff'}/>
                        <View style={styles.imgBox}>
                            <Image style={styles.userImg} source={{uri: 'https://placehold.jp/70x70.png'}}/>
                            <Text style={styles.nameText}>たけ</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={[styles.topText, {fontSize: 18, }]}>{pairsData.mainAnniversaryDataTitle}</Text>
                        <Text style={[styles.topText, {fontSize: 40, fontWeight: 'bold', letterSpacing: 2}]}>{pairsData.countUntilToday()}</Text>
                        {/*<Text style={[styles.topText, {}]}>{dayjs(ani.date).format('YYYY年MM月DD日')}</Text>*/}
                    </View>
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

    imgBox :{
        justifyContent: 'center', alignItems: "center"
    },

    nameText: {
        color: '#fff'
    },

    userImg: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginHorizontal: 20,
        marginBottom: 8
    }
})