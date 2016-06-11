import config from '../config';
import { User } from '../User';
import IHttpPromise = ng.IHttpPromise;
import IHttpService = ng.IHttpService;

class WebService {
    constructor(private $http: IHttpService) { }

    public fetchInitialData(): IHttpPromise<Object> {
        return this.$http.get(config.urls.initalData);
    }

    public edit(user: User): IHttpPromise<Object> {
        const url = config.urls.edit + user.id;
        return this.$http.post(url, <User>user);
    }

    public findAll(idArr: number[]): IHttpPromise<Object> {
        const params = {
            ids: idArr.join(',')
        };
        return this.$http.get(config.urls.findAll, params);
    }

    public find(id: number): IHttpPromise<Object> {
        const params = {
            id: id
        };
        return this.$http.get(config.urls.find, {params});
    }

    public remove(user: User): IHttpPromise<Object> {
        const url = config.urls.remove + user.id;
        return this.$http.post(url, <User>user);
    }
}

export default angular.module('WebServiceModule', ['ngResource'])
    .factory('WebService', $http => new WebService($http));
