import React, {useState} from "react";
import {Text, View, StyleSheet, FlatList, ListRenderItemInfo} from "react-native";
import {Card} from "react-native-elements";


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
    }
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


    const _renderItem = (item : ListRenderItemInfo<AnniversaryListType>) => {
        return (
            <Card containerStyle={styles.card}
                  wrapperStyle={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 12, color: '#A0A0A0'}}>付き合ってから！</Text>
                <Text style={{marginRight: 15,fontSize: 20}}>99999日目</Text>
                <Text style={{color: 'pink'}}>2021.11.2</Text>
            </Card>
        )
    }

    return (
        <View style={{ flex: 1}}>
            <FlatList
                data={anniversaryList}
                renderItem={_renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    topText: {
        color: '#ffffff'
    },

    card: {
        borderRadius: 6
    }
})