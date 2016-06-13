import { IUserView } from '../../User';
import { IDataTableController } from './DataTableController.d.ts';
import { IWebService } from '../../services/WebService/WebService.d.ts';

export default class DataTableController implements IDataTableController {
    public users: IUserView[];
    public error: string = '';
    public editing: boolean = false;

    constructor(private WebService: IWebService, private toaster: ngtoaster.IToasterService) {
        this.WebService.fetchInitialData()
            .then(this.handleInitialData.bind(this))
            .catch(this.handleError.bind(this));
    }

    public userRemove(index: number) {
        const user = this.users[index];
        user.frozen = true;

        this.WebService.remove(user)
            .then(response => {
                if (response.status === 200) {
                    this.users.splice(this.users.indexOf(user), 1);
                }
            })
            .catch(error => {
                user.frozen = false;
                this.toaster.error('Error occurred', 'User cannot be removed (server response status: ' + error.status + ')');

                // console.error('An error occurred while removing user', user, error);
            });
    }

    public userSave(index: number) {
        const user = this.users[index];
        user.frozen = true;

        this.WebService.edit(user)
            .then(response => {
                if (response.status === 200) {
                    user.edited = false;
                    user.frozen = false;
                }

            })
            .catch(error => {
                user.frozen = false;
                this.toaster.error('Error occurred', 'User cannot be saved (server response status: ' + error.status + ')');

                // console.error('An error occurred while saving user', user, error);
            });
    }

    public editSelected() {
        let count = 0;
        for (let user of this.users) {
            if (user.selected && !user.frozen) {
                user.edited = true;
                count++;
            }
        }

        if (count > 0)
            this.editing = true;
    }

    public saveSelected() {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].selected && !this.users[i].frozen)
                this.userSave(i);
        }

        this.editing = false;
    }

    public handleError(response) {
        this.error = response.statusText;
        console.error('Error occurred while fetching initial data', response);
    }

    private handleInitialData(response) {
        if (response.status === 200 && response.data.users)
            this.users = response.data.users.map(user => {
                user.selected = false;
                user.edited = false;
                user.frozen = false;
                return user;
            });
    }
}
