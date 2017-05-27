/**
 * Created by frosty on 5/25/17.
 */

import angular from 'angular';

//Import Components
import './components/index';
import './directives/index';
import './services/index';

const appModule = angular.module('app', ['app.components', 'app.services', 'app.directives']);

angular.bootstrap(document.body, ['app']);