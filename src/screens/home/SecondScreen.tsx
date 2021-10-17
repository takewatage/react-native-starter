import React, {useState} from "react";
import {Text, View, StyleSheet, FlatList, ListRenderItemInfo} from "react-native";
import {Button, Card, Icon} from "react-native-elements";
import Ripple from "react-native-material-ripple";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const TEST = [
    {
        id: 1,
        title: 'test'
    },
    {
        id: 2,
        title: 'test'
    },
    {
        id: 3,
        title: 'test'
    },
    {
        id: 4,
        title: 'test'
    },
]

interface AnniversaryListType {
    id: number
    title?: string
    date?: string
    countDown?:number
    daysLater?: string
}

export const SecondScreen = () => {
    const [anniversaryList, setAnniversaryList] = useState<AnniversaryListType[]>(TEST)
    const safeArea = useSafeAreaInsets();

    const _renderItem = (item : ListRenderItemInfo<AnniversaryListType>) => {
        return (
            <Ripple onPress={() => {}} style={styles.card}>
                <Text style={{fontSize: 12, color: '#A0A0A0'}}>付き合ってから！</Text>
                <Text style={{marginRight: 15,fontSize: 20}}>99999日目</Text>
                <Text style={{color: 'pink'}}>2021.11.2</Text>
            </Ripple>
        )
    }

    return (
        <View style={{ flex: 1, padding: 15, position:"relative"}}>
            <FlatList
                data={TEST}
                renderItem={_renderItem}
                keyExtractor={item => item.id.toString()}
            />

            <Ripple style={[styles.Icon, {bottom: safeArea.bottom}]} onPress={() => console.log('hello')}>
                <Icon
                    name='plus'
                    type='antdesign'
                    color={'#fff'}
                    size={35}
                    underlayColor={'pink'}
                />
            </Ripple>
        </View>
    )
}

const styles = StyleSheet.create({
    topText: {
        color: '#ffffff'
    },

    card: {
        borderRadius: 6,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: "#fff",
        marginBottom: 15,
        paddingVertical: 15,
        paddingHorizontal: 15
    },

    Icon: {
        position: 'absolute',
        right: 25,
        backgroundColor: 'pink',
        borderRadius: 100,
        width: 60,
        height:60,
        alignItems: 'center',
        justifyContent: 'center',
        /* shadow */
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    }
})