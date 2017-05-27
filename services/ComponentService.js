import angular from 'angular';

angular.module('app.services').factory('ComponentService', function($q, $compile, $rootScope){

  const API = {
    createComponent
  };

  return API;

  /**
   *
   * @param options.template [String|HTMLElement]- This is the template that you want angular to compile
   * @param options.anchor [String|HTMLElement[ - This is the element that the component should use as an anchor (append on)
   * @param options.data [Object] - Items that will be attached to the scope of the PARENT SCOPE of the new component
   *        MAGIC - options.data.__onSuccess - you can use this function in your template, and it will resolve the result promise
   *        MAGIC - options.data.__onError - you can use this function in your template, and it will reject the result promise
   */

  function createComponent(options){
    let {template, anchor, data} = options;
    let scope, deferred, response;

    // Fail if there is no template passed in
    if(!template){
      console.error('You much call \'ComponentService.create\' and pass in options.template.');
      return $q.reject();
    }

    // If no anchor is provided, use the document.body
    if(!anchor){
      anchor = angular.element(document.body);
    } else {
      // make sure that the anchor is an HTMLElement
      anchor = angular.element(anchor);
    }

    // Replace `__onSuccess` and `__onError`
    let inOnSuccess = data.__onSuccess;
    data.__onSuccess = ()=> {
      deferred.resolve();
      response.api.doDestroy();
      if(inOnSuccess && inOnSuccess instanceof Function){
        inOnSuccess();
      }
    };
    let inOnError = data.__onError;
    data.__onError = ()=> {
      deferred.reject();
      // response.api.doDestroy();
      if(inOnError && inOnError instanceof Function){
        inOnError();
      }
    };

    // Create a new scope for the component
    scope = $rootScope.$new();
    deferred = $q.defer();

    // If options.data was passed in, extend those values onto the scope
    if(data){
      angular.extend(scope, data);
    }

    // Make sure template is an HTMLELement
    template = angular.element(template);

    // Append the component to the anchor
    template.appendTo(anchor);

    // Compile the template with Angular
    $compile(template)(scope);

    response = {
      api: {
        // Expose a function that the consumer can use to force a destroy
        doDestroy: function(){
          template.remove();
          scope.$destroy();
        }
      },
      // Expose a promise that will be success when the template calls `__onSuccess`,
      // and will error when the template calls `__onError`;
      result: deferred.promise
    }

    return response;

  }

});