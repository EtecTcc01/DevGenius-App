//IMPORT DOS COMPONENTES/ELEMENTOS USADOS
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//IMPORT DAS PAGES
import { Welcome } from '../pages/Welcome'
import { Home } from '../pages/Home'
import { Profile } from '../pages/Profile'
import { Notes } from '../pages/Notes';
import { Groups } from '../pages/Groups'
import { Begin } from '../pages/Begin'
import { Action } from '../pages/Action'
import { Stages } from '../pages/Stages';
import { Options } from '../pages/Options';
import { GroupCourses } from '../pages/GroupCourses';
import { Details } from '../pages/Details';

//TRANSFERENCIA DE FUNÇÕES P/CONSTANTE
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function StackRoutes() {
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
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "black"
                    },
                    headerTitleStyle: {
                        color: 'black',
                        fontWeight: 'bold',
                    },
                    headerLeft: () => { return }
                }}
            />

            <Stack.Screen
                name="Stages"
                component={Stages}
                options={{
                    headerShown: true
                }}
            />

            <Stack.Screen
                name="Details"
                component={Details}
                options={{
                    headerShown: true
                }}
            />

            <Stack.Screen
                name="GroupCourses"
                component={GroupCourses}
                options={{
                    headerShown: true
                }}
            />

            <Stack.Screen
                name="Begin"
                component={Begin}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "black"
                    },
                    headerTitleStyle: {
                        color: 'black',
                        fontWeight: 'bold',
                    },
                    headerLeft: () => { return }
                }}
            />

            <Stack.Screen
                name="Action"
                component={Action}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="Options"
                component={Options}
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
                component={TabsRoutes}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

function TabsRoutes() {
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
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "black"
                    },
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
                name="Notes"
                component={Notes}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "black"
                    },
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
                name="Groups"
                component={Groups}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "black"
                    },
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
                name="Profile"
                component={Profile}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "black"
                    },
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
