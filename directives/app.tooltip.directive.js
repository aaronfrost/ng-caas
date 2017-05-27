import $ from 'jquery';

const tooltips = [];

let injector;
let PositionService;
let positionInterval;
let $body = $(document.body);

// Instead of two listeners for each tooltip, just two global delegate listeners for all tooltips
$body.on('mouseenter', '[app-tooltip]', function(e){
  let el, text;
  let $this = $(this);

  // Get the angular injector, so that I can get the PositionService.
  // I want the PositionService, so that it can update the position of my tooltip.
  injector = injector || $body.injector();
  PositionService = PositionService || injector.get('PositionService');

  // Get the text from the event target
  text = $this.attr('app-tooltip');

  // Have jQuery build the DOM element
  el = $(`<app-tooltip-base class="tt-hidden"><span class="tt-text">${text}</span></app-tooltip-base>`);

  // Attach it to the body, and then store a reference to it
  $body.append(el);
  tooltips.push(el);

  // Update the position, then remove the hidden class, so it will appear
  updatePosition(el, $this);
  el.removeClass('tt-hidden');

  // In case of scrolling and such, update the position regularly.
  positionInterval = setInterval(()=> updatePosition(el, $this), 100);

}).on('mouseleave', '[app-tooltip]', function(){
  clearInterval(positionInterval);
  destroyAllTooltips();
});

// A function to update the position of the tooltip
function updatePosition(el, anchor){
  PositionService.positionElement($(el)[0], $(anchor)[0]);
}

// Destroys all Tooltips
function destroyAllTooltips(){
  tooltips.forEach(tt => tt.remove() );
}