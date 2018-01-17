import angular from "angular";

const app = angular.module("app.services");

let count = 0;

app.factory("InitService", function($http, $q) {
    const API = {
        init
    };

    return API;

    function init() {
        console.log("Initing", ++count);
        return;
    }
});
