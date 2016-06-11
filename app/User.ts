export default class User {
    id: number;
    name: string;
    surname: string;
    birthDate: Date;
    mobile: string;
    address: string;

    constructor(id: number, name: string, surname: string, birthDate: Date, mobile: string, address: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.birthDate = birthDate;
        this.mobile = mobile;
        this.address = address;
    }
}