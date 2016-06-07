import WebService from './services/Web-Service';

// TODO: split controller into a different file
// TODO: add tests

var app = angular.module('app', [WebService.name])
    .controller('AppCtrl', function AppCtrl(WebService) {
        this.hi = '5';

        console.log(WebService);
        console.log(this);
    });


// Bootstrap Angular when everything is loaded
angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});