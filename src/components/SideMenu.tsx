import React, {useState} from "react";
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    Animated,
    ActivityIndicator,
    TouchableNativeFeedback,
    TouchableOpacity, TouchableHighlight, Alert
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon, ListItem, Overlay} from "react-native-elements";
import {reset} from "../store/modules/mainDate";
import {useDispatch} from "react-redux";


export type Props = {
    isOpen: boolean,
    setOpen: Function
}

const SideMenu:React.VFC<Props> = (props) => {
    const safeArea = useSafeAreaInsets();
    const [load, setLoad] = useState(false)
    const isOpen = props.isOpen
    const dispatch = useDispatch()

    useState(() => {
    })

    const onReset = () => {
        Alert.alert('記念日のリセットしますか？','※現在のデータは消えてしまいます。', [
            {text: 'はい', onPress: () => {

                setTimeout(async () => {
                    setLoad(true)
                    await dispatch(reset())
                    setLoad(true)
                }, 1000)
                }},
            {text: 'いいえ', onPress:() => {return}}
        ])
    };

    return (
        <>
            <View style={{height: safeArea.top}} />
            <View style={styles.sideMenuContainer}>
                <View>
                    <Icon style={styles.closeIcon} color={"pink"} size={30}
                          containerStyle={{marginLeft:'auto', width: 40, height:40}}
                          name={'close'} type={'antdesign'}
                          onPress={() => {
                              props.setOpen(false)
                          }}
                    />
                </View>


                <TouchableHighlight
                    underlayColor={"pink"}
                    activeOpacity={0.8}
                    onPress={() => {
                        onReset()
                    }}
                >
                    <ListItem>
                        <ListItem.Content>
                           <ListItem.Title>記念日をリセットする</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </TouchableHighlight>
            </View>

            <Overlay
                isVisible={load}
                overlayStyle={{backgroundColor: 'transparent'}}
                style={{ flex:1}}>

                <ActivityIndicator
                    color="pink"
                    style={{backgroundColor: "transparent"}}
                    size={'large'}
                    animating={true} />
            </Overlay>
        </>
    );
};




const styles = StyleSheet.create({

    sideMenuContainer: {
        backgroundColor:'#fff',
        height: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        position:"relative",
        padding: 15
    },

    closeIcon: {
        // position:"absolute",
        // top: 0,
        // left:0
        textAlign: "right",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 'auto'
    }
});

export default SideMenu;