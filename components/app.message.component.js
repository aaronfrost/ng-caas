import angular from 'angular';

const template = `
<div class="pure-g" ng-click="$ctrl.toggleMessagePopover()" ng-class="{'is-new': $ctrl.message.isNew}">
  <div class="pure-u-1-24"></div>
  <div class="pure-u-1-6" stop-bubble="click" app-tooltip="Message from {{:: $ctrl.creator.name.first}} {{:: $ctrl.creator.name.last}}">
    <app-avatar user-id="$ctrl.message.creator" ></app-avatar>
  </div>
  <div class="pure-u-1-12"></div>
  <div class="pure-u-2-3">{{$ctrl.message.text}}</div>
  <div class="pure-u-1-24"></div>
</div>
<app-popover show="$ctrl.showPopover" on-close="$ctrl.onMessagePopoverClose()" above="true">
  <div class="pure-g">
    <div class="pure-u-1-5">
      <span ng-click="$ctrl.toggleShowEditModal();$ctrl.toggleMessagePopover()" app-tooltip="Click to edit this message">Edit</span>
    </div>
    <div class="pure-u-1-5"></div>
    <div class="pure-u-1-5" app-tooltip="Click to delete this message">Delete</div>
    <div class="pure-u-1-5"></div>
    <div class="pure-u-1-5" app-tooltip="Click to relpy to this message">Reply To</div>
  </div>
</app-popover>
<app-modal show="$ctrl.showEditModal" on-close="$ctrl.onEditModalClosed()">
  <h5>Edit Message</h5>
  <form class="pure-form">
    <div class="pure-group">
      <textarea class="pure-input-1" placeholder="you cannot leave the message blank" ng-model="$ctrl.message.text" style="font-size:12px;"></textarea>
    </div>
    <BR>
    <BR>
    <div class="pure-controls" style="text-align:right;">
      <button type="submit" class="pure-button" ng-click="$ctrl.cancelEditedMessage()">Cancel</button>
      <button type="submit" class="pure-button pure-button-primary" ng-click="$ctrl.saveEditedMessage()">Save</button>
    </div>
  </form>
</app-modal>
`;

class MessageController{

  constructor(UserService, $element){
    this.userService = UserService;
    this.$el = $element;

    this.showEditModal = false;
    console.log("Component Initing");
  }

  $onChanges(changes){
    if(changes.message && changes.message.currentValue){
      this.setupMessage();
    }
  }

  setupMessage(){
    this.originalMessageText = this.message.text;
    this.userService.getUserById(this.message.creator)
      .then(user=> this.creator = user);
  }

  toggleMessagePopover(){
    this.showPopover = !!!this.showPopover;
  }

  onMessagePopoverClose(){
    this.showPopover = false;
  }

  onEditModalClosed(){
    this.showEditModal = false;
  }

  toggleShowEditModal(){
    this.showEditModal = !!!this.showEditModal;
  }

  saveEditedMessage(){
    this.toggleShowEditModal();
  }

  cancelEditedMessage(){
    this.message.text = this.originalMessageText;
    this.toggleShowEditModal();
  }
}

angular.module('app.components').component('appMessage', {
  template: template,
  controller: MessageController,
  bindings:{
    message: '<'
  }
})