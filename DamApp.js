import React from 'react';
import { createAppContainer } from 'react-navigation';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Rubro from './rubro/Rubro';
import ListaRubro from './rubro/ListaRubro';

const Vista1 = () => {
  return (
    <View>
      <Text>Vista 1</Text>
      <Text style={{ fontSize: 50, color: 'blue' }}>Vista 1111</Text>
    </View>
  );
};

const Vista2 = () => {
  return (
    <View>
      <Text>Vista 2</Text>
      <Text style={{ fontSize: 50, color: 'blue' }}>Vista 2222</Text>
    </View>
  );
};

const MainNavigator = createBottomTabNavigator({
  Rubro: Rubro,
  Lista: ListaRubro,
});

const DamApp = createAppContainer(MainNavigator);
// const DamApp = createBottomTabNavigator(MainNavigator);

export default DamApp;
