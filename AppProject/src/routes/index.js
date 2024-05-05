// IMPORT DOS ICONS USADOS
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// IMPORT DOS NAVIGATORS USADOS
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// IMPORT DOS COMPONENTS A SEREM EXIBIDOS POR ROTAS
import { Welcome } from '../pages/Welcome';
import { Home } from '../pages/Home';
import { BeginForms } from '../pages/BeginForms';

// CRIAÇÃO DAS VARIAVEIS QUE RECEBERÃO AS FUNÇÕES IMPORTADAS ANTES
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// IMPORT DAS PAGES PRA RENDERIZAÇÃO
import { TeoryNote } from '../pages/TeoryNote/index'
import { Groups } from '../pages/Groups';
import { Profile } from '../pages/Profile';
import { Action } from '../pages/Action';

// CRIAÇÃO DE UMA FUNÇÃO DE ROTA
export function StackRoutes() {
    return (
        // CRIAÇÃO DO CONTAINER A GUARDAR AS ROTAS ADCIONADAS, E CONFIG (ROTA INICIAL -> Welcome)
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
            {/* CRIAÇÃO DA ROTA INICIAL, E OPTIONS (CHAME-A PELO NAME) */}
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{
                    headerShown: false
                }}
            />

            {/* ROTAS DE FORMULÁRIOS PARA LOGIN/CADASTRO */}
            <Stack.Screen
                name="Begin-Form"
                component={BeginForms}
                options={{
                    headerShown: false,
                    headerLeft: () => { return }
                }}
            />

            {/* ROTA P/EXECUÇÃO DAS TAREFAS POR ESTÁGIO */}
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

            {/* INTERCALANDO AMBAS AS ROTAS (IMPORTANTE!!! P/TER ACESSO A FUNÇÃO E SUAS ROTAS, É NECESSÁRIO CHAMA-LÁ PELO NAME) */}
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

// CRIAÇÃO DE UMA FUNÇÃO DE ROTA
function TabsRoutes() {
    // FUNÇÕES DE ROTAS A SEREM APARECIDAS ASSIM QUE PASSAR DO LOGIN NO APP
    return (
        // CRIAÇÃO DO CONTAINER A GUARDAR AS ROTAS ADCIONADAS, E CONFIG (ROTA INICIAL -> 1° DENTRO DO CONTAINER)
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
            {/* CRIAÇÃO DE UMA ROTA, E OPTIONS (CHAME-A PELO NAME) */}
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