//react-navigation lib dependency
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

//app
import App from './src/App';

AppRegistry.registerComponent(appName, () => App);
