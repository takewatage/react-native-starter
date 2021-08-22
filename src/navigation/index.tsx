/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import {HeaderCloseBtn} from '../components/HeaderCloseBtn'
import {HeaderBackBtn} from "../components/HeaderBackBtn";
import {HomeScreen} from "../screens/home";


const Stack = createStackNavigator();

export const Navigator = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
    return(
        <NavigationContainer
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    )
}

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={ModalNavigation} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    );
}


/**
 * モーダルナビゲーション
 * 下からスクリーンが出てくる動き
 * @constructor
 */
const ModalNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName={'MainNavigation'}
            screenOptions={({ navigation }) => ({
                gestureEnabled: false,
                cardOverlayEnabled: true,
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerTitleAlign: 'center',
                headerTitleStyle: {fontWeight:'bold', fontSize: 16},
                headerLeft: () => <HeaderCloseBtn />
            })}
            mode={'modal'}
        >
            <Stack.Screen name='MainNavigation' component={IosModalNavigation} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}


/**
 * IOSモーダルナビゲーション
 * IOSのモーダルの動き
 * @constructor
 */
const IosModalNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName={'MainNavigation'}
            screenOptions={({ navigation }) => ({
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...TransitionPresets.ModalPresentationIOS,
                headerTitleAlign: 'center'
            })}
            mode={'modal'}
        >
            <Stack.Screen name='MainNavigation' component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name='FilterModalNavigation' component={FilterModalNavigator} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}


const SecondStackNavigator = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'left',
                headerTitleStyle: {fontWeight:'bold', fontSize: 16},
                headerLeft: () => <HeaderBackBtn />
            }}
        >
            <Stack.Screen name="Tab" component={BottomTabNavigator} options={{headerShown: false}}/>

            {/* page */}
        </Stack.Navigator>
    )
}


const FilterModalNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={'FilterScreen'}
            screenOptions={()  => ({
                headerTitleAlign: 'center',
                headerTitleStyle: {fontWeight:'bold', fontSize: 16},
                headerLeft: () => <HeaderCloseBtn />
            })}>
        </Stack.Navigator>
    );
}

const PlaceSearchModalNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={'PlaceSearchScreen'}
            screenOptions={({ navigation }) => ({
                gestureEnabled: false,
                headerTitleAlign: 'center',
                headerTitleStyle: {fontWeight:'bold', fontSize: 16},
                headerLeft: () => <HeaderBackBtn />
            })}>
        </Stack.Navigator>
    );
}