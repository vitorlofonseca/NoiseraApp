import React from 'react'
import { Platform } from 'react-native'
import {
    createStackNavigator,
    createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../home/HomeScreen'
import ListGigsScreen from '../screens/ListGigsScreen'
import ListGroupsScreen from '../screens/ListGroupsScreen'
import AddGigScreen from '../screens/AddGigScreen'
import AddGroupScreen from '../screens/AddGroupScreen'
import SettingsScreen from '../settings/SettingsScreen'

const HomeStack = createStackNavigator({
    Home: HomeScreen,
})

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
}

const GigsStack = createStackNavigator({
    Gigs: ListGigsScreen,
    AddGigScreen: AddGigScreen,
})

GigsStack.navigationOptions = {
    tabBarLabel: 'Gigs',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-mic' : 'md-mic'}
        />
    ),
}

const GroupsStack = createStackNavigator({
    Groups: ListGroupsScreen,
    //AddGroupScreen: AddGroupScreen,
})

GroupsStack.navigationOptions = {
    tabBarLabel: 'Groups',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
        />
    ),
}

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
})

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
}

const GroupStack = createStackNavigator({
    Settings: AddGroupScreen,
})

GroupStack.navigationOptions = {
    tabBarLabel: 'Add Group',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
}

export default createBottomTabNavigator({
    HomeStack,
    GroupsStack,
    GigsStack,
    SettingsStack,
    GroupStack
})
