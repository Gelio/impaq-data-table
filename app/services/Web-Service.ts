import config from '../config';
import User from '../User';

class WebService {
    constructor(private $http, private $resource) {
        console.log('changed');
    }

    remove(user: User) {

    }

    edit(user: User) {

    }

    findAll() {

    }

    find() {

    }
}

export default angular.module('WebServiceModule', ['ngResource'])
    .factory('WebService', ($http, $resource) => new WebService($http, $resource));