import angular from 'angular';
import {MainContentController} from './app.maincontent.controller';

const app = angular.module('app.components');

const template = `
<div class="channel-header pure-g">
  <div class="pure-u-1-12"></div>
  <div class="channel-name pure-u-2-3">{{$ctrl.selectedChannel.name}}</div>  
  <div class="channel-user-count pure-u-1-4" ng-mouseover="$ctrl.getSelectedMembersText()" app-tooltip="{{$ctrl.selectedMembersTooltipText}}">{{$ctrl.selectedChannel.members.length}} users</div>  
</div> 
<app-messages-container>
  <app-message
    ng-repeat="message in $ctrl.messages"   
    message="message"
  ></app-message>
</app-messages-container>
<app-message-input 
  on-new-message="$ctrl.addMessage(message)"
></app-message-input>
`;

app.component('appMainContent', {
  template,
  controller: MainContentController,
  bindings:{
    selectedChannel: '<'
  }
});

