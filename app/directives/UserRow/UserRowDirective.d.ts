import { IUserView } from '../../User';

interface IUserRowDirectiveScope extends ng.IScope {
    user: IUserView;

    createBackup(): void;
    cancelEdit(): void;
    remove(): void;
    save(): void;
}

// Just for unit testing purposes
interface IUserRowDirectiveExtendedScope extends IUserRowDirectiveScope {
    vm: {
        userRemove(): void
        userSave(): void;
    };
}
