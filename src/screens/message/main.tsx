import {StyleSheet, Text, View} from "react-native";
import * as React from "react";

export default function MessageScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>メッセージ</Text>
            <Text>メッセージ？</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});