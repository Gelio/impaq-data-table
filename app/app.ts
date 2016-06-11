import WebService from './services/Web-Service';
import DataTableController from './controllers/DataTable/DataTableController';
import UserRowDirective from './directives/UserRow/UserRowDirective';

// TODO: split controller into a different file
// TODO: add tests

angular.module('app', [WebService.name, UserRowDirective.name])
    .controller('DataTableCtrl', DataTableController);


// Bootstrap Angular when everything is loaded
angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});
