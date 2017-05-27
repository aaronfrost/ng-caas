import angular from 'angular';

angular.module('app.directives', []).directive('stopBubble', function(){
  return {
    restrict: 'A',
    link: function(scope, el, attrs){
      if(attrs.stopBubble){
        el.on(attrs.stopBubble, function(e){
          e.stopPropagation();
        });
      }
    }
  }
});