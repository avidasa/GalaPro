import { Action } from './Action';

export class User {
    name: string;
    actions: Action[];

    constructor(name: string, action: Action) {
        this.name = name;
        this.actions = [action];
    }
}
