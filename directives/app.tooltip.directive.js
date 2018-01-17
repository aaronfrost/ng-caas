import angular from "angular";
import $ from "jquery";

const tooltips = [];

const app = angular.module("app.directives", []);

app.directive("appTooltip", function(PositionService, InitService) {
    return {
        restrict: "A",
        replace: false,
        scope: true,
        link: function(scope, el, attrs) {
            let tooltip;
            let positionInterval;

            InitService.init();

            init();

            function init() {
                attrs.$observe("appTooltip", () => {
                    updateText();
                });
                addHover();
            }

            function updateText() {
                if (attrs.appTooltip && attrs.appTooltip.length) {
                    scope.text = attrs.appTooltip.replace(/\n/gi, "<br>");
                }
            }

            function addHover() {
                //No destroy listener needed, since events are on this element. `removeData` takes care of it
                el.on("mouseenter", createTooltip);
                el.on("mouseleave", destroyTooltip);
            }

            function createTooltip() {
                destroyTooltip();
                tooltip = $(
                    `<app-tooltip-base class="tt-hidden"><span class="tt-text">${
                        scope.text
                    }</span></app-tooltip-base>`
                );
                tooltip.appendTo(document.body);
                tooltips.push(tooltip);
                PositionService.positionElement(tooltip[0], el[0]);
                tooltip.removeClass("tt-hidden");
                positionInterval = setInterval(() => {
                    PositionService.positionElement(tooltip[0], el[0]);
                }, 200);
            }

            function destroyTooltip() {
                clearInterval(positionInterval);
                destroyAllTooltips();
            }

            function destroyAllTooltips() {
                tooltips.forEach(tt => tt.remove());
            }
        }
    };
});
