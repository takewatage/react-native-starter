import React, {useEffect, useState, useRef} from "react"


import {
    Platform,
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    Alert
} from "react-native"
import {Button, Image, Input, Overlay} from "react-native-elements";
import {InitScreen} from "../screens/home/InitScreen";
import FirestoreService from "../services/FirestoreService";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {updatePairCode} from "../store/modules/pairs";
import {AnniversaryState, fetchAnniversary, updateAnniversary, updateCheckLoading, updatePageLoading, updatePageName} from "../store/modules/anniversary";

import LottieView from 'lottie-react-native'
import {InitNavigator} from "../navigation";
import useColorScheme from "../hooks/useColorScheme";
import Pairs from "../models/pairs";

interface Props {
    children: JSX.Element;
    // onNotificationOpened?: (data: { [key: string]: string }) => any;
}

const AuthProvider = ({ children }: Props):JSX.Element => {

    const [loading, setLoading] = useState(false)
    const [completeLoading, setCompleteLoading] = useState(false)
    const [pairCodeText, setPairCode] = useState('')
    const {pairCode} = useSelector<RootState, {pairCode: string}>((state:RootState) => state.pairCode)
    const {pageName, pageLoading, checkLoading} = useSelector<RootState, AnniversaryState>((state:RootState) => state.anniversary)

    const dispatch = useDispatch()
    const colorScheme = useColorScheme();

    useEffect(() => {

        if(pairCode) {

            dispatch(fetchAnniversary({code: pairCode}))

        }

    }, [])



    const checkPairCode = async () => {

        dispatch(updatePageLoading(true))

        const res = await FirestoreService.getPairs(pairCodeText)
        if(!res) {
            setTimeout(() => {
                Alert.alert('ペアコードが違います', '', [{text: 'はい', onPress: () => {
                        dispatch(updatePageLoading(false))
                    }}] )
            }, 1000)
            return
        }

        res.anniversaries = await FirestoreService.getAnniversary(res.id)

        console.log(res)

        setTimeout(() => {
            dispatch(updatePairCode(pairCodeText))
            dispatch(updateAnniversary(res.getPostable() as Pairs))

            dispatch(updatePageLoading(false))
            dispatch(updateCheckLoading(true))

            setTimeout(() => {
                dispatch(updateCheckLoading(false))
                dispatch(updatePageName('init'))
            }, 3000)
        }, 1000)
    }

    const _RenderLoading = () => {
        return (
            <View>
                <Overlay
                    isVisible={pageLoading}
                    overlayStyle={{elevation: 0,backgroundColor: 'transparent'}}
                    style={{ flex:1, width: '100%'}}>

                    <LottieView style={{width: 100, opacity: 0.7}} source={require('../../assets/lottie/pink-loading.json')} autoPlay loop />
                </Overlay>
                <Overlay
                    isVisible={checkLoading}
                    overlayStyle={{elevation: 0,backgroundColor: 'transparent'}}
                    style={{ flex:1, width: '100%'}}>

                    <LottieView style={{width: 100,}} source={require('../../assets/lottie/check-mark-confirm-circle-with-pop.json')} autoPlay />
                </Overlay>
            </View>
        )
    }




    return (
        <View style={styles.container}>
            <ImageBackground style={{width: '100%', height: '100%'}} resizeMode="cover"
                             source={require('../../assets/images/bg/bg.jpeg')}>
                {
                    !pairCode && (
                        <ImageBackground style={{width: '100%', height: '100%'}} resizeMode="cover"
                                         source={require('../../assets/images/bg/bg.jpeg')}>

                            <KeyboardAvoidingView behavior={Platform.OS=='ios'?'padding':'height'} style={{flex: 1,}}>
                                <View style={{flex: 1, alignItems: "center", justifyContent: 'center'}}>
                                    <Text style={{fontSize: 20, marginBottom:10}}>ペアコードを入力してください</Text>
                                    <Input containerStyle={{maxWidth: 220}} onChangeText={setPairCode} value={pairCodeText}/>

                                    <Button
                                        activeOpacity={0.8}
                                        title="決定"
                                        buttonStyle={{backgroundColor: "pink", borderRadius: 50}}
                                        containerStyle={{width: 200, borderRadius: 50}}
                                        disabled={!pairCodeText}
                                        onPress={checkPairCode}
                                        raised
                                    />
                                </View>
                            </KeyboardAvoidingView>
                        </ImageBackground>
                    )
                }

                {
                    pageName == 'init'&&(<InitNavigator colorScheme={colorScheme}/>)
                }

                {
                    pageName == 'main'&&(
                        children
                    )
                }

                <_RenderLoading />
            </ImageBackground>
        </View>
    )

}

export default AuthProvider;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center'
    },

    bg: {
        width: '100%',
        height: '100%',
        // position: 'absolute',
        // top: 0,
        // left: 0,
    }
})
