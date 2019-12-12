/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import DamApp from './DamApp';
import AppLab07 from './AppLab07';
import ListaClasificados from './rubro/ListaClasificados';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import ListaRubro from './rubro/ListaRubro';

AppRegistry.registerComponent(appName, () => ListaClasificados);
