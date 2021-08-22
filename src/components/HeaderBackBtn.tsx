import * as React from "react";
import Ripple from "react-native-material-ripple";
import {Icon} from "react-native-elements";
import {useNavigation} from '@react-navigation/native'
import {ViewStyle} from "react-native";


interface Props {
    color?: string;
    containerStyle?: ViewStyle;
}

export const HeaderBackBtn: React.VFC<Props> = (props) => {
    const nav = useNavigation()
    return (
        <Ripple style={props.containerStyle} onPressOut={() => nav.goBack()}>
            <Icon iconStyle={{color: props.color?props.color:'#434343'}} name={'chevron-left'} type={'feather'} size={30}/>
        </Ripple>
    )
}


export default HeaderBackBtn;