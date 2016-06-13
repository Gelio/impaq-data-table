import {User} from '../../User';

interface IWebService {
    fetchInitialData(): ng.IHttpPromise<Object>;
    edit(user: User): ng.IHttpPromise<Object>;
    findAll(idArr: number[]): ng.IHttpPromise<Object>;
    find(id: number): ng.IHttpPromise<Object>;
    remove(user: User): ng.IHttpPromise<Object>;
}
