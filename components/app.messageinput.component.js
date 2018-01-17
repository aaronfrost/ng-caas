import angular from "angular";

const template = `
<div class="pure-u-1-24"></div>
<div class="pure-u-11-12">
  <form class="pure-form" ng-submit="$ctrl.addMessage()">
    <fieldset>
      <legend class="hit-enter">hit "Enter" to send message</legend>
      <div class="pure-g">
        <input type="text" class="pure-u-1" ng-model="$ctrl.currentMessage">
      </div>
    </fieldset>
  </form>
</div>
<div class="pure-u-1-24"></div>
`;

class MessageInputController {
    constructor($timeout, $element, InitService) {
        this.$timeout = $timeout;
        this.$el = $element;

        this.$el.addClass("pure-g");
        InitService.init();
    }

    addMessage() {
        if (!this.currentMessage || !this.currentMessage.length) return;

        let newMessage = {
            text: this.currentMessage,
            creator: 66,
            isNew: true
        };

        this.onNewMessage({ message: newMessage });
        this.$timeout(() => (newMessage.isNew = false), 2500);

        this.currentMessage = undefined;
    }
}

const app = angular.module("app.components");

app.component("appMessageInput", {
    template,
    controller: MessageInputController,
    bindings: {
        onNewMessage: "&"
    }
});
