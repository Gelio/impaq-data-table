import { IUserView } from '../../User';
import { IWebService } from '../../services/WebService/WebService';

interface IDataTableController {
    users: IUserView[];
    error: string;
    editing: boolean;
    constructor(WebService: IWebService, toaster: ngtoaster.IToasterService);
    userRemove(index: number);
    userSave(index: number);
    editSelected();
    saveSelected();
    handleError(response: ng.IHttpPromiseCallback);
    handleInitialData(response: ng.IHttpPromiseCallback);
}
