import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { UsersData, Source } from '../models/UsersData';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  static USERS_KEY = 'users';
  static SERVER_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

  /**
   * Add the user to the local database.
   * If exists - just add the new actions
   *
   * @param user the new user to add
   */
  public async addOrUpdateUser(user: User) {
    const localUsers = await this.getLocalUsers();
    const foundUser = localUsers.users.find(u => u.name === user.name);
    if (!foundUser) {
      this.saveUsersLocally([...localUsers.users, user]);
    } else {
      foundUser.actions = [...foundUser.actions, ...user.actions];
      this.saveUsersLocally(localUsers.users);
    }
  }

  /**
   * Sync the users to the server, and returns updated user list from the server.
   *
   * @returns Returns a promise for UsersData from the server
   */
  public async syncUsers() {
    const localUsers = localStorage.getItem(DatabaseService.USERS_KEY);
    if (!localUsers) {
      return await this.getServerUsers();
    }
    const users = await this.http.post<User[]>(DatabaseService.SERVER_URL, JSON.parse(localUsers)).toPromise();
    this.saveUsersLocally(users);
    return new UsersData(new Date(), Source.Server, users);
  }

  /**
   * Saves the users in local db
   *
   * @param users The users list
   */
  private saveUsersLocally(users: User[]) {
    localStorage.setItem(DatabaseService.USERS_KEY, JSON.stringify(users));
  }

  /**
   * Gets user list from server
   *
   * @returns A promise for a UsersData object with the server users
   */
  private async getServerUsers() {
    const users = await this.http.get<User[]>(DatabaseService.SERVER_URL).toPromise();
    this.saveUsersLocally(users);
    return new UsersData(new Date(), Source.Server, users);
  }

  /**
   * Gets users list from localstorage
   * If the list is empty locally - gets it from the server.
   *
   * @returns A promise for a UsersData object with the users
   */
  public async getLocalUsers() {
    const localUsers = localStorage.getItem(DatabaseService.USERS_KEY);
    if (!localUsers) {
      return await this.getServerUsers();
    } else {
      return new UsersData(new Date(), Source.Local, JSON.parse(localUsers));
    }
  }
}
