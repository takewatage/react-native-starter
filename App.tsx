import React from 'react';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from "react-native";
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import {Navigator} from './src/navigation/index';
import store from './src/store'
import {Provider, connect} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";
import FirestoreService from "./src/services/FirestoreService";
import C from 'expo-constants'
import AuthProvider from "./src/provider/authProvider";


export const persister = persistStore(store)

const conf = {
    key: C.manifest?.extra?.firebase.apiKey,
    domain: C.manifest?.extra?.firebase.authDomain,
    projectId: C.manifest?.extra?.firebase.projectId,
    bucket: C.manifest?.extra?.firebase.storageBucket
}
FirestoreService.create(conf.key, conf.domain, conf.projectId, conf.bucket)


export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <ActionSheetProvider>
                <Provider store={store}>
                    <PersistGate persistor={persister}>
                        <SafeAreaProvider>
                            <StatusBar
                                barStyle={'light-content'}
                                backgroundColor="transparent"
                                translucent
                            />
                            <AuthProvider>
                                <Navigator colorScheme={colorScheme}/>
                            </AuthProvider>
                        </SafeAreaProvider>
                    </PersistGate>
                </Provider>
            </ActionSheetProvider>
        );
    }
}
