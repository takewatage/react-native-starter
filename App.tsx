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

export const persister = persistStore(store)

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <PersistGate persistor={persister}>
                    <SafeAreaProvider>
                        <StatusBar
                            barStyle={'light-content'}
                            backgroundColor="transparent"
                            translucent
                        />
                        <Navigator colorScheme={colorScheme}/>
                    </SafeAreaProvider>
                </PersistGate>
            </Provider>
        );
    }
}
