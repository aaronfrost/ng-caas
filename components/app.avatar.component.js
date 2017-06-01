import angular from 'angular';
import {AvatarController}  from './app.avatar.controller';

const template = `
<img ng-src="{{$ctrl.user.picture[$ctrl.picSize]}}" ng-if="$ctrl.user" ng-click="$ctrl.togglePopover($event);"/>
<app-popover ng-if="!$ctrl.noPopover" show="$ctrl.showPopover" on-close="$ctrl.popoverClosed()">
  <div class="pure-form pure-form-aligned">
    <fieldset>
      <div class="pure-control-group">
        <span class="pure-g">
          <span class="pure-u-1-3"></span>
          <span class="pure-u-1-3">
            <app-avatar no-popover="true" size="large" user-id="$ctrl.user.id"></app-avatar>
          </span>
          <span class="pure-u-1-3"></span>
        </span>
      </div>
      <div class="pure-control-group">
        <label for="name">Name: </label>
        <span class="pure-form-message-inline">{{$ctrl.user.name.first}} {{$ctrl.user.name.last}}</span>
      </div>
      <div class="pure-control-group" app-tooltip="Click to email {{$ctrl.user.name.first}} {{$ctrl.user.name.last}}">
        <label for="name">Email: </label>
        <span class="pure-form-message-inline">{{$ctrl.user.email}}</span>
      </div>
      <div class="pure-control-group" app-tooltip="Click to blah {{$ctrl.user.name.first}} {{$ctrl.user.name.last}}">
        <label for="name">Phone: </label>
        <span class="pure-form-message-inline">{{$ctrl.user.phone}}</span>
      </div>
    </fieldset>
    
    
  </div>
</app-popover>
`;

const app = angular.module('app.components');

app.component('appAvatar', {
  template,
  controller: AvatarController,
  bindings:{
    userId: '<',
    size: '@'
  }
})