// @ts-ignore
import React from "react";
import {View, Text, StatusBar, StyleSheet, Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon} from "react-native-elements";

export type Props = {
    title?: string,
}

const TopNavigation = (props: Props) => {
    const safeArea = useSafeAreaInsets();

    const {title} = props;

    return (
        <>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor="transparent"
                translucent
            />
            <View style={{width:'100%', height: safeArea.top}}/>
            <Animated.View style={[styles.container]}>
                <Text style={[styles.title]}>{title}</Text>
            </Animated.View>
        </>
    );
};




const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowOffset: {width:0, height: 0},
        zIndex: 100,
        paddingRight: 19
    },

    title: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default TopNavigation;