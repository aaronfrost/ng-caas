import angular from "angular";

const template = `
<div class="pure-g" ng-click="$ctrl.toggleMessagePopover()" ng-class="{'is-new': $ctrl.message.isNew}">
  <div class="pure-u-1-24"></div>
  <div class="pure-u-1-6" stop-bubble="click">
    <app-avatar user-id="$ctrl.message.creator" app-tooltip="Message from {{:: $ctrl.creator.name.first}} {{:: $ctrl.creator.name.last}}"></app-avatar>
  </div>
  <div class="pure-u-1-12"></div>
  <div class="pure-u-2-3">{{$ctrl.message.text}}</div>
  <div class="pure-u-1-24"></div>
</div>
`;

const popoverTemplate = `
<app-popover show="getShowPopover()" on-close="onMessagePopoverClose();" above="true">
  <div class="pure-g">
    <div class="pure-u-1-5">
      <span ng-click="onClickEdit()" app-tooltip="Click to edit this message">Edit</span>
    </div>
    <div class="pure-u-1-5"></div>
    <div class="pure-u-1-5" app-tooltip="Click to delete this message">Delete</div>
    <div class="pure-u-1-5"></div>
    <div class="pure-u-1-5" app-tooltip="Click to relpy to this message">Reply To</div>
  </div>
</app-popover>
`;

const modalTemplate = `
<app-modal show="getShowModal()" on-close="onEditModalClosed()">
  <h5>Edit Message</h5>
  <form class="pure-form">
    <div class="pure-group">
      <textarea class="pure-input-1" placeholder="you cannot leave the message blank" ng-model="message.text" style="font-size:12px;"></textarea>
    </div>
    <BR>
    <BR>
    <div class="pure-controls" style="text-align:right;">
      <button type="submit" class="pure-button" ng-click="cancelEditedMessage()">Cancel</button>
      <button type="submit" class="pure-button pure-button-primary" ng-click="saveEditedMessage()">Save</button>
    </div>
  </form>
</app-modal>
`;

class MessageController {
    constructor(UserService, $element, ComponentService, InitService) {
        this.userService = UserService;
        this.componentService = ComponentService;
        this.$el = $element;

        this.showEditModal = false;
        InitService.init();
    }

    $onChanges(changes) {
        if (changes.message && changes.message.currentValue) {
            this.setupMessage();
        }
    }

    $onDestroy() {
        if (this.popoverRef) {
            this.popoverRef.api.doDestroy();
        }
    }

    setupMessage() {
        this.originalMessageText = this.message.text;
        this.userService
            .getUserById(this.message.creator)
            .then(user => (this.creator = user));
    }

    toggleMessagePopover() {
        this.showPopover = !!!this.showPopover;

        if (this.showPopover) {
            this.createPopover();
        }
    }

    createPopover() {
        let ref = (this.popoverRef = this.componentService.createComponent({
            template: popoverTemplate,
            anchor: this.$el,
            data: {
                getShowPopover: () => this.showPopover,
                onMessagePopoverClose: () => {
                    this.showPopover = false;
                    ref.api.doDestroy();
                },
                onClickEdit: () => {
                    this.toggleShowEditModal();
                    this.toggleMessagePopover();
                }
            }
        }));
        ref.result.then(
            () => {
                this.popoverRef = undefined;
            },
            () => {}
        );
    }

    onMessagePopoverClose() {
        this.showPopover = false;
    }

    onEditModalClosed() {
        this.showEditModal = false;
    }

    toggleShowEditModal() {
        this.showEditModal = !!!this.showEditModal;
        if (this.showEditModal) {
            this.createEditModal();
        }
    }

    createEditModal() {
        let ref = (this.modalRef = this.componentService.createComponent({
            template: modalTemplate,
            anchor: this.$el,
            data: {
                onEditModalClosed: () => {
                    this.onEditModalClosed();
                    ref.api.doDestroy();
                },
                getShowModal: () => this.showEditModal,
                message: this.message,
                cancelEditedMessage: () => this.cancelEditedMessage(),
                saveEditedMessage: () => this.saveEditedMessage()
            }
        }));
    }

    saveEditedMessage() {
        this.toggleShowEditModal();
    }

    cancelEditedMessage() {
        this.message.text = this.originalMessageText;
        this.toggleShowEditModal();
    }
}

angular.module("app.components").component("appMessage", {
    template: template,
    controller: MessageController,
    bindings: {
        message: "<"
    }
});
