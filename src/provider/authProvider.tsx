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
import dayjs from "dayjs";
import {reset} from "../store/modules/mainDate";

interface Props {
    children: JSX.Element;
    // onNotificationOpened?: (data: { [key: string]: string }) => any;
}

const AuthProvider = ({ children }: Props):JSX.Element => {

    const [check, setCheck] = useState(false)
    const [loading, setLoading] = useState(false)
    const [pairCodeText, setPairCode] = useState('')
    const {pairCode} = useSelector<RootState, {pairCode: string}>((state:RootState) => state.pairs)

    const dispatch = useDispatch()

    useEffect(() => {

        console.log(pairCode)
        if(pairCode) {
            setCheck(true)
            return
        }

    }, [])


    const checkPairCode = async () => {
        console.log("ppp")
        setLoading(true)

        const res = await FirestoreService.checkPairCode(pairCodeText)
        if(!res) {
            Alert.alert('ペアコードが違います', '', [{text: 'はい', onPress: () => {
                    setLoading(false)
                }}] )
            return
        }

        setTimeout(() => {
            dispatch(updatePairCode(pairCodeText))
            // setLoading(false)
            // setCheck(true)
        }, 1000)
    }


    if(check) {
        return children;
    }


    return (
        <ImageBackground style={{width: '100%', height: '100%'}} resizeMode="cover"
                         source={require('../../assets/images/bg/bg.jpeg')}>

            <KeyboardAvoidingView behavior="padding" style={{flex: 1,}}>
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

            <View>
                <Overlay
                    isVisible={loading}
                    overlayStyle={{backgroundColor: 'transparent'}}
                    style={{ flex:1}}>

                    <ActivityIndicator
                        color="pink"
                        style={{backgroundColor: "transparent"}}
                        size={'large'}
                        animating={true} />
                </Overlay>
            </View>

        </ImageBackground>
    )


}

export default AuthProvider;

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%',
        // position: 'absolute',
        // top: 0,
        // left: 0,
    }
})
