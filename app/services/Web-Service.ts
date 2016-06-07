var WebService = angular.module('WebServiceModule', ['ngResource'])
    .factory('WebService', ($http, $resource) => {
        // TODO: do this service
        return {
            sayHi: 'Hello-World'
        };
    });

export default WebService;