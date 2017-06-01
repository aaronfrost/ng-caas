import angular from 'angular';
import $ from 'jquery';

const template = `
<app-modal-inner ng-if="$ctrl.active" ng-class="{active: $ctrl.active}">
  <app-modal-overlay ng-click="$ctrl.doClose()"></app-modal-overlay>
  <app-modal-body>
    <app-modal-header class="pure-g">
      <div class="pure-u-23-24"></div>
      <app-modal-close-x class="pure-u-1-24" ng-click="$ctrl.doClose()">X</app-modal-close-x>
    </app-modal-header>
    <ng-transclude></ng-transclude>
  </app-modal-body>
</app-modal-inner>
`;

let count = 0;

class ModalController{

  constructor($element, $scope){
    this.$el = $($element);

    this.active = false;
    this.count = count++;

    $scope.$parent.$on('$destroy',()=> $scope.$destroy());

    console.log("Component Initing");
  }

  $onChanges(changes){
    if(changes.show && changes.show.currentValue){
      this.activateModal();
    } else if(this.active && changes.show && !changes.show.currentValue){
      this.deactivateModal();
    }
  }

  activateModal(){
    this.active = true;

    // Attach this element to the root of the body
    this.$el.appendTo(document.body);
  }

  deactivateModal(){
    this.active = false;
    this.$el.remove();
    this.onClose();
  }

  doClose(){
    this.deactivateModal();
  }

}

angular.module('app.components').component('appModal', {
  template,
  controller: ModalController,
  transclude: true,
  bindings: {
    show: '<',
    onClose: '&',
  }
});