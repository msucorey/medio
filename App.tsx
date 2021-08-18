import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { StateProvider } from "./state";
import type { Action, Reducer, SimpleGlobalState } from "./state";

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const initialState = {};
  const rootReducer = (
    state: SimpleGlobalState = initialState,
    action: Action
  ) => {
    switch (action.type) {
      case "UPDATE_GLOBAL_STATE":
        return { ...state, ...action.payload };
      case "RESET_GLOBAL_STATE":
        return initialState;
      default:
        return state;
    }
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <StateProvider initialState={initialState} reducer={rootReducer}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </StateProvider>
    );
  }
};

export default App;
