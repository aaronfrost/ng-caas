import angular from 'angular';
import $ from 'jquery';

const app = angular.module('app.services');
app.factory('PositionService', function () {

  const API = {
    positionElement
  };

  return API;

  /**
   *
   * @param element: HTMLElement - this is the element to be positioned
   * @param anchor: HTMLElement - this is the element that the @element should be placed above
   */
  function positionElement(element, anchor, above=true) {

    let {clientWidth: anchorWidth, clientHeight: anchorHeight} = anchor;
    let {top: anchorTop, left: anchorLeft} = $(anchor).offset();

    let {clientWidth: elementWidth, clientHeight: elementHeight} = element;

    let newTop, newLeft;
    let documentHeight = $(document.body).height();
    let documentWidth = $(document.body).width();

    if(above){
      newTop = anchorTop - elementHeight - 10;
      newLeft = (anchorLeft + (anchorWidth / 2)) - (elementWidth / 2);

      if(newTop < 0){ //The top is off the top of the screen, so we need to go under the anchor
        newTop = anchorTop + anchorHeight + 10;
      }
    } else {
      newTop = anchorTop + anchorHeight + 10;
      newLeft = (anchorLeft + (anchorWidth / 2)) - (elementWidth / 2);

      if((newTop + elementHeight) > documentHeight){ //Goes off the bottom
        newTop = anchorTop - elementHeight - 10;
      }
    }

    if(newLeft < 0){
      newLeft = 10;
    } else if(newLeft + elementWidth > documentWidth){
      newLeft = documentWidth - 10 - elementWidth;
    }

    // Round, to prevent shaking
    newLeft = Math.round(newLeft);
    newTop = Math.round(newTop);

    $(element).css({
      'position': 'fixed',
      'top': `${newTop}px`,
      'left': `${newLeft}px`
    });
  }
});
