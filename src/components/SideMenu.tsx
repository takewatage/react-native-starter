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
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native'
import {resetPairCode} from '../store/modules/pairs'
import {resetAnniversary, updatePageLoading, updatePageName} from '../store/modules/anniversary'
import {RootState} from "../store";
import Ripple from "react-native-material-ripple";
import FirestoreService from "../services/FirestoreService";
import Pairs from "../models/pairs";

export type Props = {
    isOpen: boolean,
    setOpen: Function
}

const SideMenu:React.VFC<Props> = (props) => {
    const safeArea = useSafeAreaInsets();
    const [load, setLoad] = useState(false)
    const isOpen = props.isOpen
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {pairCode} = useSelector<RootState, {pairCode: string}>((state:RootState) => state.pairCode)
    const {pairs} = useSelector<RootState, {pairs: Pairs}>((state:RootState) => state.anniversary)
    const [_pairs, set_Pairs] = useState(new Pairs({}))

    const MENU = [
        {menu: '記念日をリセットする', f: () => onReset()},
        {menu: '編集(comming soon)', f: () => onEdit()},
        {menu: 'ログアウト', f: () => onLogOut()},
    ]

    useState(() => {
        set_Pairs(new Pairs({...pairs}))
        const ani = _pairs.mainAnniversaryData
    })

    const onReset = () => {
        Alert.alert('記念日のリセットしますか？','※現在のデータは消えてしまいます。', [
            {text: 'はい', onPress: () => {

                setTimeout(async () => {
                    dispatch(updatePageLoading(true))
                    await FirestoreService.deleteAnniversary(pairCode, _pairs.mainAnniversaryData?_pairs.mainAnniversaryData.type:"")
                    dispatch(updatePageLoading(false))
                    dispatch(updatePageName("init"))
                }, 1000)
                }},
            {text: 'いいえ', onPress:() => {return}}
        ])
    };

    // 編集
    const onEdit = () => {
        navigation.navigate("TopEditScreen")
    }

    // ログアウト
    const onLogOut = async() => {
        console.log('onLogOut')
        Alert.alert('ログアウトしますか？','', [
            {text: 'はい', onPress: () => {
                    setLoad(true)
                    dispatch(resetPairCode())
                    dispatch(resetAnniversary())
            }},
            {text: 'いいえ', onPress:() => {return}}
        ])
    }

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


                {MENU.map((x,i) => {
                    return (
                        <Ripple
                            rippleColor={'pink'}
                            onPress={x.f}
                            key={x.menu}
                        >
                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title>{x.menu}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        </Ripple>
                    )
                })}
                {/*<TouchableHighlight*/}
                {/*    underlayColor={"pink"}*/}
                {/*    activeOpacity={0.8}*/}
                {/*    onPress={() => {*/}
                {/*        onEdit()*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <ListItem bottomDivider>*/}
                {/*        <ListItem.Content>*/}
                {/*            <ListItem.Title>編集</ListItem.Title>*/}
                {/*        </ListItem.Content>*/}
                {/*    </ListItem>*/}
                {/*</TouchableHighlight>*/}

                {/*<TouchableHighlight*/}
                {/*    underlayColor={"pink"}*/}
                {/*    activeOpacity={0.8}*/}
                {/*    onPress={() => {*/}
                {/*        console.log("popopo")*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <ListItem bottomDivider>*/}
                {/*        <ListItem.Content>*/}
                {/*            <ListItem.Title>ログアウト</ListItem.Title>*/}
                {/*        </ListItem.Content>*/}
                {/*    </ListItem>*/}
                {/*</TouchableHighlight>*/}

                <Text>{pairCode}</Text>
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