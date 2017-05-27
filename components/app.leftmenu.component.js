import angular from 'angular';
import {LeftMenuController} from './app.leftmenu.controller';

const app = angular.module('app.components');
const template = `
<div class="pure-menu">
    <span class="pure-menu-heading">Channels</span>
    <ul class="pure-menu-list" ng-if="$ctrl.channels.length">
        <li 
          ng-repeat="channel in $ctrl.channels" 
          class="pure-menu-item"
          ng-class="{'pure-menu-selected': channel === $ctrl.selected}"
          app-tooltip="This is a channel about {{channel.name}}"
        ><a 
              href="#{{channel.id}}" 
              class="channel-name pure-menu-link"
              ng-click="$ctrl.selectChannel(channel)"
          >{{channel.name}}</a>
        </li>
    </ul>
</div>
`;

app.component('appLeftMenu', {
  template,
  controller: LeftMenuController,
  bindings:{
    onSelectChannel: '&'
  }
})