import { Component, OnInit } from '@angular/core';
import { UsersData } from '../../models/UsersData';
import { DatabaseService } from 'src/app/services/database.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  usersData: UsersData;

  constructor(private databaseService: DatabaseService, public snackBar: MatSnackBar) {
    // At first get the users locally
    this.getUserslocally();
  }

  ngOnInit() {
  }

  async getUserslocally() {
    try {
      this.usersData = await this.databaseService.getLocalUsers();
      this.snackBar.open('Updated users list!');
    } catch {
      this.snackBar.open('An error occured :(');
    }
  }

  async syncUsers() {
    try {
      this.usersData = await this.databaseService.syncUsers();
      this.snackBar.open('Users were synced with the server!');
    } catch {
      this.snackBar.open('An error occured :(');
    }

  }
}
