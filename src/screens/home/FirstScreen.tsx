import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {Icon, Image} from "react-native-elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export const FirstScreen = () => {
    const safeArea = useSafeAreaInsets()

    return (
        <View style={{ flex: 1, backgroundColor: 'transparent' , justifyContent: 'center', height:'100%'}} >
            <View style={[{flexDirection: 'row', justifyContent: 'center'}, styles.position]}>
                <Image style={styles.userImg} source={{uri: 'https://placehold.jp/70x70.png'}}/>
                <Icon size={30} name={'heart'} type={'font-awesome'} color={'#ffffff'}/>
                <Image style={styles.userImg} source={{uri: 'https://placehold.jp/70x70.png'}}/>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[styles.topText, {fontSize: 14, }]}>付き合って</Text>
                <Text style={[styles.topText, {fontSize: 30, fontWeight: 'bold'}]}>１年 3ヶ月 28日</Text>
                <Text style={[styles.topText, {}]}>2020/04/25</Text>
            </View>
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