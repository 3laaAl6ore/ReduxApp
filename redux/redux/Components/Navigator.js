//IMPORT LIBS
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Utilities/AppColors';

//IMPORT SCREENS
import DashboardScreen, {screenOptions as DashboardScreenOptions} from './Dashboard';
import TrackDetailsScreen, {screenOptions as TrackDetailsScreenOptions} from './TrackDetails';
import MyMusicScreen from './MyMusic';

const defaultScreenOptions = {
    headerStyle: {backgroundColor: Colors.happy_green},
    headerTitleStyle: {fontFamily: 'Poppins-Regular'},
    headerTintColor: Colors.white
}

//CREATE STACK(s) NAVIGATIONS
const DashboardStackNavigator = createStackNavigator();
export const DashboardStack = () => {
    return(
        <DashboardStackNavigator.Navigator screenOptions={defaultScreenOptions}>
            <DashboardStackNavigator.Screen name='Dashboard' component={DashboardScreen} options={DashboardScreenOptions} />
            <DashboardStackNavigator.Screen name='TrackDetails' component={TrackDetailsScreen} options={TrackDetailsScreenOptions} />
        </DashboardStackNavigator.Navigator>
    )
}

const MyMusicStackNavigator = createStackNavigator();
export const MyMusicStack = () => {
    return(
        <MyMusicStackNavigator.Navigator screenOptions={defaultScreenOptions}>
            <MyMusicStackNavigator.Screen name='MyMusic' component={MyMusicScreen} />
            <MyMusicStackNavigator.Screen name='TrackDetails2' component={TrackDetailsScreen} options={TrackDetailsScreenOptions} />
        </MyMusicStackNavigator.Navigator>
    )
}

const AppTabsNavigator = createMaterialBottomTabNavigator();
export const AppTabs = () => {
    return(
        <AppTabsNavigator.Navigator activeColor={Colors.gray_10} inactiveColor={Colors.orange} barStyle={{backgroundColor:Colors.gray_text}} shifting={true}>
            <AppTabsNavigator.Screen name='DashboardTab' component={DashboardStack} options={{ tabBarLabel:'Search', tabBarIcon:(() => <AntDesign name='search1' color={Colors.white} size={30} />) }}  />
            <AppTabsNavigator.Screen name='MyMusicTab' component={MyMusicStack} options={{ tabBarLabel:'My Music', tabBarIcon:(() => <MaterialCommunityIcons name='music' color={Colors.white} size={30} />) }}  />
        </AppTabsNavigator.Navigator>
    )
}