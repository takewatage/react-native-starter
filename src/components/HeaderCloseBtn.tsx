import * as React from "react";
import Ripple from "react-native-material-ripple";
import {Icon} from "react-native-elements";
import {useNavigation} from '@react-navigation/native'


export const HeaderCloseBtn = () => {
    const nav = useNavigation()
    return (
        <Ripple style={{marginLeft:10, padding: 10}} onPressOut={() => nav.goBack()}>
            <Icon iconStyle={{color:'rgba(0, 0, 0, 0.54)'}} name={'close-a'} type={'fontisto'} size={14}/>
        </Ripple>
    )
}