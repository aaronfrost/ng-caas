import angular from "angular";
import $ from "jquery";

const template = `
<app-popover-base ng-if="$pop.active" stop-bubble="click.popoverbodyclicklistener{{$pop.count}}">
  <ng-transclude></ng-transclude>
</app-popover-base>
`;

let count = 0;

class PopoverController {
    constructor($element, PositionService, $timeout, $scope, InitService) {
        this.$el = $($element);
        this.$parent = this.$el.parent();
        this.positionService = PositionService;
        this.$timeout = $timeout;
        this.$scope = $scope;
        this.active = false;
        this.count = count++;

        $scope.$parent.$on("$destroy", () => $scope.$destroy());
        InitService.init();
    }

    $onChanges(changes) {
        if (changes.show && changes.show.currentValue == true) {
            this.activatePopover();
        } else if (changes.show && !changes.show.currentValue) {
            this.deactivatePopover();
        }
    }

    activatePopover() {
        let that = this;
        // `active` adds and removes the popover body from the element, with ng-if
        this.active = true;

        // Attach the element to the body, so overflow won't cut it off.
        this.$el.appendTo(document.body);

        // Position the element, now that it is added
        this.positionElement();

        // Add the `active` class, so that it will show
        // this.$el.addClass('active');

        // Wait until the next loop, to let the current click finish. Otherwise, this listener will fire immediately
        this.$timeout(() => {
            // Once active, any clicks on the body should deactivate it
            $(document.body).on(
                `click.popoverbodyclicklistener${this.count}`,
                function() {
                    that.deactivatePopover();
                    that.$scope.$applyAsync();
                }
            );
        });

        // Delay initial paint, to let positions finish updating
        this.$timeout(() => {
            this.$el.addClass("active");
        }, 200);

        // Position the element relative to it's parent
        this.positionInterval = setInterval(() => {
            this.positionElement();
        }, 100);
    }

    positionElement() {
        this.positionService.positionElement(
            this.$el[0],
            this.$parent[0],
            this.above == "true"
        );
    }

    deactivatePopover() {
        // Removes the body from the DOM
        this.active = false;

        // Hides it using CSS
        this.$el.removeClass("active");

        // Remove the element from the dom on deactivation
        this.$el.remove();

        // Cleans up the body click listeners
        $(document.body).off(`click.popoverbodyclicklistener${this.count}`);

        // Let heirarchy know that it is closing
        this.onClose();

        // Removes the interval for positioning the popover
        clearInterval(this.positionInterval);
    }

    $onDestroy() {
        this.deactivatePopover();
        this.$el.remove();
    }
}

const app = angular.module("app.components");

app.component("appPopover", {
    template: template,
    controller: PopoverController,
    controllerAs: "$pop",
    transclude: true,
    bindings: {
        show: "<",
        onClose: "&",
        above: "@"
    }
});
