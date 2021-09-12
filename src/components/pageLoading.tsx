import React, {useState} from "react";
import {View, Text, StatusBar, StyleSheet, Animated, ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon, Overlay} from "react-native-elements";

export type Props = {
    isLoad: boolean,
    setLoad?: Function
}

const PageLoading = (props: Props) => {
    const safeArea = useSafeAreaInsets();
    const [load, serLoad] =useState(props.isLoad)

    useState(() => {

    })

    return (
        <Overlay
            isVisible={load}
            overlayStyle={{backgroundColor: 'transparent'}}
            style={styles.container}>

            <ActivityIndicator
                color="pink"
                style={{backgroundColor: "transparent"}}
                size={'large'}
                animating={true} />
        </Overlay>
    );
};




const styles = StyleSheet.create({
    container: {
        flex:1,

    },
});

export default PageLoading;