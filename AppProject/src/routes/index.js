import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Welcome } from '../pages/Welcome';
import { Home } from '../pages/Home';
import { BeginForms } from '../pages/BeginForms';
import { TeoryDetail } from '../pages/TeoryNote/Details/teoryDetail'; 
import { TeoryNote } from '../pages/TeoryNote/index';
import { Groups } from '../pages/Groups';
import { Profile } from '../pages/Profile';
import { Action } from '../pages/Action';

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
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Begin-Form"
                component={BeginForms}
                options={{
                    headerShown: false,
                    headerLeft: () => { return }
                }}
            />

            <Stack.Screen
                name="Action"
                component={Action}
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
                    headerShown: false
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
                name="Groups"
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
                name="Profile"
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
