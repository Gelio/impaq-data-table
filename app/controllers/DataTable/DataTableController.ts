import {User, IUserView} from '../../User';

export default class DataTableController {
    public users: IUserView[];
    public error: string = '';
    public editing: boolean = false;

    constructor(private WebService) {
        this.WebService.fetchInitialData()
            .then(this.handleInitialData.bind(this))
            .catch(this.handleError.bind(this));
    }

    public userRemove(index: number) {
        const user = this.users[index];
        // TODO: disable forms while user is being deleted
        // TODO: Delete user from the list only after the promise succeeded
        this.WebService.remove(user);
    }

    public userSave(index: number) {
        const user = this.users[index];
        console.log('Saving user', index, this.users[index]);
        // TODO: disable forms while user is being saved
        // TODO: change 'edited' to false after it is saved
        this.WebService.edit(user);
    }

    public editSelected() {
        for (let user of this.users) {
            if (user.selected)
                user.edited = true;
        }

        this.editing = true;
    }

    public saveSelected() {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].selected)
                this.userSave(i);
        }

        this.editing = false;
    }

    public handleError(response) {
        this.error = response.data;
        console.error('Error occurred while fetching initial data', response);
    }

    private handleInitialData(response) {
        if (response.status === 200 && response.data.users)
            this.users = response.data.users.map(user => {
                user.selected = false;
                user.edited = false;
                return user;
            });
    }
}
