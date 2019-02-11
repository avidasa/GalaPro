import { User } from './User';

export class UsersData {
    constructor(private updated: Date, private source: Source, public users: User[]) {}
}

export enum Source {
    Local, Server
}
