import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { LogInBg } from "../pages/Begin/LogInBegin";
import { SignInBg } from "../pages/Begin/SignInBegin";
import { InfoBg } from "../pages/Begin/InfoBegin";
import { DifficultyLvl } from "../pages/Home/DifficultyLvl";
import { PersonalAct } from "../pages/Home/PersonalAct";
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { TeoryNote } from '../pages/TeoryNote';
import { Welcome } from "../pages/Welcome";
import { BasicAct } from "../pages/Action/BasicAct";
import { IntermediaryAct } from "../pages/Action/IntermediaryAct";
import { AdvancedAct } from '../pages/Action/AdvancedAct';
import { TeoryBook } from "../pages/Action/teoryBook";
import { Groups } from "../pages/Groups";
import { TeoryList } from "../components/TeoryList";  
import { TeoryDetail } from "../pages/TeoryNote/teoryDetail";  

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function MyTabs() {
    return (
        <Tab.Navigator
            backBehavior="history"
            screenOptions={{
                tabBarHideOnKeyboard: false,
                tabBarStyle: {
                    backgroundColor: '#000',
                    borderTopWidth: 0,
                    elevation: 0
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size, color }) => (
                        <Ionicons
                            size={size}
                            color={focused ? '#06c244' : color}
                            name={focused ? 'home' : 'home-outline'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="TeoryNote"
                component={TeoryNote}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size, color }) => (
                        <MaterialIcons
                            size={size}
                            color={focused ? '#06c244' : color}
                            name={'library-books'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Groups}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size, color }) => (
                        <MaterialIcons
                            size={size}
                            color={focused ? '#06c244' : color}
                            name={'group'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Groups"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size, color }) => (
                        <MaterialIcons
                            size={size}
                            color={focused ? '#06c244' : color}
                            name={'person'}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export function Routes() {
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                headerTintColor: '#06c244',
                headerStyle: {
                    backgroundColor: '#000',
                    borderBottomWidth: 0,
                    elevation: 0,
                },
                headerTitleStyle: {
                    color: '#fff',
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="LogIn"
                component={LogInBg}
                options={{
                    headerShown: false,
                    headerLeft: () => { return }
                }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignInBg}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#000',
                        borderBottomWidth: 0,
                        elevation: 0,
                    },
                    headerTitleStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="UserInfo"
                component={InfoBg}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Difficulty"
                component={DifficultyLvl}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#000',
                        borderBottomWidth: 0,
                        elevation: 0,
                    },
                    headerTitleStyle: {
                        color: '#000',
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="Activities"
                component={PersonalAct}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#000',
                        borderBottomWidth: 0,
                        elevation: 0,
                    },
                    headerTitleStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="BasicAct"
                component={BasicAct}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#000',
                        borderBottomWidth: 0,
                        elevation: 0,
                    },
                    headerTitleStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="IntermediaryAct"
                component={IntermediaryAct}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#000',
                        borderBottomWidth: 0,
                        elevation: 0,
                    },
                    headerTitleStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="AdvancedAct"
                component={AdvancedAct}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#000',
                        borderBottomWidth: 0,
                        elevation: 0,
                    },
                    headerTitleStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="TeoryBook"
                component={TeoryBook}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#000',
                        borderBottomWidth: 0,
                        elevation: 0,
                    },
                    headerTitleStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="TeoryDetail"
                component={TeoryDetail}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#000',
                        borderBottomWidth: 0,
                        elevation: 0,
                    },
                    headerTitleStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="TeoryList"
                component={TeoryList}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#000',
                        borderBottomWidth: 0,
                        elevation: 0,
                    },
                    headerTitleStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="Tabs"
                component={MyTabs}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}
