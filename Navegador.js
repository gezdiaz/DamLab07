import React from 'react';
import { createAppContainer } from 'react-navigation';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Rubro from './rubro/Rubro';
import ListaRubro from './rubro/ListaRubro';
import ListaClasificados from './rubro/ListaClasificados';
import Catalogo from './rubro/Catalogo';
import { createStackNavigator } from 'react-navigation-stack';
import AltaClasificado from './rubro/AltaClasificado';

const AppTabNavigator = createBottomTabNavigator({
    Clasificados: ListaClasificados,
    Catalogo: Catalogo,
});

const MainNavigator = createStackNavigator({
    TabNavigator: {
        screen: AppTabNavigator,
        navigationOptions: {
            headerMode: "none",
            header: null
        }
    },
    Rubro: {
        screen: Rubro,
        navigationOptions: {
            headerMode: "none",
            header: null
        }
    },
    ListaRubro: {
        screen: ListaRubro,
        navigationOptions: {
            headerMode: "none",
            header: null
        }
    },
    AltaClasificado: {
        screen: AltaClasificado,
        navigationOptions: {
            headerMode: "none",
            header: null
        }
    },
});

const Navegador = createAppContainer(MainNavigator);
//const Navegador = createBottomTabNavigator(MainNavigator);

export default Navegador;