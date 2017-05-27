import * as angular from 'angular';
import {AppComponentClass} from './app.component.controller';

const app = angular.module('app.components', []);

const template = `
<div class="pure-g" style="height: 100%">
  <app-left-menu 
    class="pure-u-1-3 pure-u-lg-1-5 pure-u-xl-1-8" 
    on-select-channel="$ctrl.onMenuSelectChannel(channel)"
  ></app-left-menu>
  <app-main-content 
    class="pure-u-2-3 pure-u-lg-4-5 pure-u-xl-7-8"
    selected-channel="$ctrl.selectedChannel"
  ></app-main-content>
</div>
`;

app.component('appMain', {
  template,
  controller: AppComponentClass
})