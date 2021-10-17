import {Text, ImageBackground, StatusBar, StyleSheet, View, TouchableNativeFeedback} from "react-native";
import * as React from "react";
import {useState} from "react";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Layout from "../../constants/Layout";
import {Icon, Image} from "react-native-elements";
import Ripple from "react-native-material-ripple";
import {FirstScreen, SecondScreen} from "./index";
import Ani from "../../models/ani";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {InitScreen} from "./InitScreen";
import {IMainDate} from "../../store/modules/mainDate";
import MenuDrawer from 'react-native-side-drawer'
import SideMenu from "../../components/SideMenu";



const renderScene = SceneMap({
    first: () => (<FirstScreen />),
    second: () => (<SecondScreen/>),
});

export default function HomeScreen() {
    const [pageIndex, setPageIndex] = useState(0)
    const {myAnniversary} = useSelector<RootState, {myAnniversary: IMainDate}>((state:RootState) => state.mainDate)
    const [isCheckValue, setCheckValue] = useState(false)
    const [isSideMenu, setIsSideMenu] = useState(false)

    const [routes] = React.useState([
        { key: 'first', title: '記念日' },
        { key: 'second', title: 'ストーリー' },
    ]);
    const safeArea = useSafeAreaInsets()

    React.useEffect(() => {
        console.log(myAnniversary.id)
        if(myAnniversary.id) {
            setCheckValue(true)
        } else {
            setCheckValue(false)
        }

    }, [myAnniversary]);

    const onMenu = () => {
        console.log("onMenu")

        setIsSideMenu(true)
    }


    const _renderTabBar = (props: any) => {
        return(
            <View>
                <View style={{width:'100%', height: safeArea.top}}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                    <TabBar
                        {...props}
                        renderLabel={({ route, focused, color }) => (
                            <View>
                                {
                                    focused?<Icon size={8} name={'heart'} type={'font-awesome'} color={'pink'}/>
                                        :<Icon size={8} name={'heart'} type={'font-awesome'} color={'transparent'}/>
                                }
                                <Text style={{ color: color, margin: 8 }}>
                                    {route.title}
                                </Text>
                            </View>
                        )}
                        inactiveColor={'rgba(255, 255, 255, 0.2)'}
                        indicatorStyle={{ backgroundColor: 'white' }}
                        style={{ backgroundColor: 'transparent', height: 60, flexGrow: 1}}
                        activeColor={'#ffffff'}
                    />
                    <Ripple
                        style={styles.tabBarIcon}
                        rippleColor={"pink"}
                        onPressOut={() => {onMenu()}}>
                        <Icon style={{}} size={25} name={'menu'} type={'feather'} color={'white'}/>
                    </Ripple>
                </View>
            </View>
        )
    }

    const mainView = () => {
        return (
            <MenuDrawer
                open={isSideMenu}
                drawerContent={<SideMenu isOpen={isSideMenu} setOpen={setIsSideMenu}/>}
                drawerPercentage={80}
                animationTime={250}
                overlay={true}
                opacity={0.4}

            >
                <TabView
                    lazy
                    style={{backgroundColor:'transparent'}}
                    sceneContainerStyle={{backgroundColor:'transparent'}}
                    swipeEnabled={true}
                    navigationState={{ index:pageIndex, routes }}
                    renderScene={renderScene}
                    onIndexChange={setPageIndex}
                    renderTabBar={_renderTabBar}
                    initialLayout={{width: Layout.window.width}}
                />
            </MenuDrawer>
        )
    }

    return (
        <View style={[styles.container]}>
            <ImageBackground style={{width: '100%', height: '100%'}} resizeMode="cover"
                             source={require('../../../assets/images/bg/bg1.jpeg')}>

                    {isCheckValue?
                        (
                            mainView()
                        ):
                        (
                            <InitScreen/>
                        )

                    }
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    tabBarIcon: {
        padding:15,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
