export class User {
    public id: number;
    public name: string;
    public surname: string;
    public birthDate: string;
    public mobile: string;
    public address: string;

    constructor(id: number, name: string, surname: string, birthDate: string, mobile: string, address: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.birthDate = birthDate;
        this.mobile = mobile;
        this.address = address;
    }
}

export interface IUserView extends User {
    selected: boolean;
    edited: boolean;
    frozen: boolean;
}
