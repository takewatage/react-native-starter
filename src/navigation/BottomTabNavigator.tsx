/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabTwoScreen from '../screens/TabTwoScreen';
import {HomeScreen} from '../screens/home/index'
import  {MessageScreen} from '../screens/message/index'
import { MyPageScreen } from '../screens/mypage/index'
import Svg, {
    Path,
} from 'react-native-svg';
import {Text, View} from "react-native";
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';


const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    // const tabBarHeight = useBottomTabBarHeight();



    return (
        <BottomTabBarHeightContext.Consumer>
            {tabBarHeight => (
                <BottomTab.Navigator
                    initialRouteName="Home"
                    sceneContainerStyle={{backgroundColor: 'blue'}}
                    tabBarOptions={{
                        activeTintColor: Colors[colorScheme].tint,
                    }}
                >

                    <BottomTab.Screen
                        name="さがす"
                        component={HomeStackNavigator}
                        options={{
                            tabBarIcon: ({color}) => {
                                return(<TabBarIcon name="ios-search" color={color}/>)
                            },
                        }}
                    />

                    <BottomTab.Screen
                        name="よてい"
                        component={MessageNavigator}
                        options={{
                            tabBarIcon: ({color}) =>
                                <Svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                                    <Path fill={color} d="M10 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H14C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V6L10 0ZM14 18H2V2H9V7H14V18ZM6 11H3V9H6V11ZM10 11H7V9H10V11ZM6 14H3V12H6V14ZM10 14H7V12H10V14ZM6 17H3V15H6V17ZM10 17H7V15H10V17Z" fill-opacity="0.55"/>
                                </Svg>
                            ,
                        }}
                    />

                    <BottomTab.Screen
                        name="メッセージ"
                        component={MessageNavigator}
                        options={{
                            tabBarIcon: ({color}) =>
                                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <Path fill={color} d="M18 0H2C0.9 0 0 0.9 0 2V20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H4L2 16V2H18V14Z" fill-opacity="0.55"/>
                                </Svg>
                            ,
                        }}
                    />

                    <BottomTab.Screen
                        name='マイページ'
                        component={MyPageNavigator}
                        options={{
                            tabBarIcon: ({color}) =>
                                <Svg width="22" height="22" viewBox="0 0 22 22">
                                    <Path fill={color} fill-rule="evenodd" clip-rule="evenodd" d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM18.3995 16.1246C19.4086 14.6703 20 12.9042 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 12.9042 2.59138 14.6703 3.6005 16.1246C4.72595 14.6381 7.3706 14 11 14C14.6294 14 17.274 14.6381 18.3995 16.1246ZM16.9647 17.7398C16.672 16.6874 14.5694 16 11 16C7.43062 16 5.328 16.6874 5.03532 17.7398C6.6233 19.1462 8.71194 20 11 20C13.2881 20 15.3767 19.1462 16.9647 17.7398ZM11 14C8.76086 14 7 12.4274 7 9C7 6.75576 8.5791 5 11 5C13.4142 5 15 6.92158 15 9.2C15 12.4796 13.2181 14 11 14ZM9 9C9 11.2693 9.81821 12 11 12C12.1777 12 13 11.2984 13 9.2C13 7.95042 12.2157 7 11 7C9.73374 7 9 7.81582 9 9Z" fill-opacity="0.55"/>
                                </Svg>,
                        }}
                    />

                </BottomTab.Navigator>
            )}
        </BottomTabBarHeightContext.Consumer>
    );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={25} style={{marginBottom: -3}} {...props} />;
}

/**
 * HOME
 * @constructor
 */
const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen}/>
        </Stack.Navigator>
    )
}


const MessageNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MessageScreen" component={MessageScreen} options={{headerTitle: 'メッセージ'}}/>
        </Stack.Navigator>
    );
}


const MyPageNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name=" MyPageScreen" component={MyPageScreen} options={{headerTitle: 'マイページ'}}/>
        </Stack.Navigator>
    );
}
