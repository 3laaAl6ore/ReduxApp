import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Dashboard from "./Components/Dashboard";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";

import { NavigationContainer } from "@react-navigation/native";
import { AppTabs } from "./Components/Navigator";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

const loadFontsFromAssets = () => {
  return Font.loadAsync({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Italic": require("./assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
};

import reducers from "./store/reducers";
const rootReducers = combineReducers({
  allTracks: reducers,
});
const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

export default function App() {
  const [isFontsLoading, setIsFontsLoading] = useState(false);

  if (!isFontsLoading) {
    return (
      <AppLoading
        startAsync={loadFontsFromAssets}
        onFinish={() => setIsFontsLoading(true)}
        onError={console.log("Something is bad")}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </Provider>
  );
}
