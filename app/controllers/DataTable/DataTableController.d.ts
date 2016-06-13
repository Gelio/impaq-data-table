import {IUserView} from '../../User';

interface IDataTableController {
    users: IUserView[];
    error: string;
    editing: boolean;

    userRemove(index: number): void;
    userSave(index: number): void;
    editSelected(): void;
    saveSelected(): void;
    handleError(response): void;
}
