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
import SandboxScreen from '../screens/SandboxScreen'
import SettingsScreen from '../settings/SettingsScreen'
import TracksOfGigScreen from '../screens/TracksOfGigScreen'
import TrackViewScreen from '../screens/TrackViewScreen'
import AddGroupScreen from '../screens/AddGroupScreen'

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

const GroupsStack = createStackNavigator({
   Groups: ListGroupsScreen,
   AddGroupScreen: AddGroupScreen,
   ListGigsScreen: ListGigsScreen,
   AddGigScreen: AddGigScreen,
   TracksOfGigScreen: TracksOfGigScreen,
   TrackViewScreen: TrackViewScreen,
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

const SandboxStack = createStackNavigator({
   Sandbox: SandboxScreen,
})

SandboxStack.navigationOptions = {
   tabBarLabel: 'Sandbox',
   tabBarIcon: ({ focused }) => (
      <TabBarIcon
         focused={focused}
         name={Platform.OS === 'ios' ? 'ios-school' : 'md-school'}
      />
   ),
}

export default createBottomTabNavigator({
   HomeStack,
   GroupsStack,
   SettingsStack,
   SandboxStack,
})
