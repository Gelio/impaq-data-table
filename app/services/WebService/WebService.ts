import config from '../../config';
import { User } from '../../User';
import { IWebService } from './WebService.d.ts';

class WebService implements IWebService {
    constructor(private $http: ng.IHttpService) { }

    public fetchInitialData(): ng.IHttpPromise<Object> {
        return this.$http.get(config.urls.initalData);
    }

    public edit(user: User): ng.IHttpPromise<Object> {
        const url = config.urls.edit + user.id;
        return this.$http.post(url, <User>user);
    }

    public findAll(idArr: number[]): ng.IHttpPromise<Object> {
        const params = {
            ids: idArr.join(',')
        };
        return this.$http.get(config.urls.findAll, params);
    }

    public find(id: number): ng.IHttpPromise<Object> {
        const params = {
            id: id
        };
        return this.$http.get(config.urls.find, {params});
    }

    public remove(user: User): ng.IHttpPromise<Object> {
        const url = config.urls.remove + user.id;
        return this.$http.post(url, <User>user);
    }
}

export default angular.module('WebServiceModule', ['ngResource'])
    .factory('WebService', $http => new WebService($http));
